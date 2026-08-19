/**
 * Deterministically swaps the Unsplash placeholder hero image on the newest
 * auto-published blog post with a matching real photo from the user's local
 * "website photos" folder, then builds, commits, and pushes.
 *
 * Runs unattended (Windows Task Scheduler, Tue/Fri) OR manually:
 *   node scripts/fix-blog-photo.mjs
 *
 * No AI. Matches a photo file to the post by normalizing both the post title
 * and each filename and requiring a high word-overlap. If nothing matches
 * confidently, it logs and exits WITHOUT changing anything (never guesses).
 *
 * All output is appended to scripts/fix-blog-photo.log so a scheduled run
 * leaves a trace.
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync, readdirSync, appendFileSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join, extname, basename } from 'path';
import { homedir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LOG = join(__dirname, 'fix-blog-photo.log');

const MANIFEST = join(ROOT, 'data', 'blog-posts.json');       // heroImg
const AUTO_MANIFEST = join(ROOT, 'src', 'data', 'auto-blog-posts.json'); // imageUrl
const BLOG_IMG_DIR = join(ROOT, 'public', 'blog-img');
const PHOTO_DIRS = [
  join(homedir(), 'Downloads', 'website photos'),
  join(homedir(), 'Downloads'),
];
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try { appendFileSync(LOG, line + '\n'); } catch {}
}
function sh(cmd, opts = {}) {
  return execSync(cmd, { cwd: ROOT, stdio: 'pipe', encoding: 'utf8', ...opts });
}
// Normalize a string to a set of lowercase alphanumeric words for matching.
function words(s) {
  return new Set(
    s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean)
  );
}
function overlap(aSet, bSet) {
  let inter = 0;
  for (const w of aSet) if (bSet.has(w)) inter++;
  const union = new Set([...aSet, ...bSet]).size;
  return union === 0 ? 0 : inter / union;
}

try {
  log('--- run start ---');

  // 1. Sync — pull the latest auto-published post. Abort on divergence.
  try {
    sh('git fetch origin');
    sh('git merge --ff-only origin/main');
  } catch (e) {
    log('ABORT: git sync failed (branch may have diverged): ' + (e.stderr || e.message));
    process.exit(1);
  }

  // 2. Find the target post: newest one whose heroImg is still Unsplash.
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const unfixed = manifest
    .filter(p => typeof p.heroImg === 'string' && p.heroImg.includes('images.unsplash.com'))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (unfixed.length === 0) {
    log('Nothing to do: every post already has a custom image.');
    process.exit(0);
  }
  const post = unfixed[0];
  log(`Target post: "${post.title}" (slug ${post.slug}, date ${post.date})`);

  // 3. Match a photo file to the post title.
  const photoDir = PHOTO_DIRS.find(d => existsSync(d));
  if (!photoDir) { log('ABORT: no photo folder found.'); process.exit(1); }
  const titleWords = words(post.title);
  let best = null, bestScore = 0;
  for (const f of readdirSync(photoDir)) {
    const ext = extname(f).toLowerCase();
    if (!IMG_EXT.has(ext)) continue;
    const score = overlap(titleWords, words(basename(f, ext)));
    if (score > bestScore) { bestScore = score; best = f; }
  }
  // Require strong overlap so a wrong photo never gets pushed unattended.
  if (!best || bestScore < 0.7) {
    log(`ABORT: no confident photo match (best "${best || 'none'}" score ${bestScore.toFixed(2)}). ` +
        `Files present: ${readdirSync(photoDir).filter(f => IMG_EXT.has(extname(f).toLowerCase())).join(' | ')}`);
    process.exit(1);
  }
  log(`Matched photo: "${best}" (score ${bestScore.toFixed(2)})`);

  // 4. Copy into public/blog-img/<slug><ext>.
  const ext = extname(best).toLowerCase();
  const destRel = `/blog-img/${post.slug}${ext}`;
  copyFileSync(join(photoDir, best), join(BLOG_IMG_DIR, `${post.slug}${ext}`));
  log(`Copied to public${destRel}`);

  // 5. Update both manifests (heroImg + imageUrl) for this slug only.
  const oldUnsplash = post.heroImg;
  const m = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  for (const p of m) if (p.slug === post.slug) p.heroImg = destRel;
  writeFileSync(MANIFEST, JSON.stringify(m, null, 2) + '\n');

  const am = JSON.parse(readFileSync(AUTO_MANIFEST, 'utf8'));
  let touchedAuto = false;
  for (const p of am) if (p.slug === post.slug) { p.imageUrl = destRel; touchedAuto = true; }
  if (touchedAuto) writeFileSync(AUTO_MANIFEST, JSON.stringify(am, null, 2) + '\n');
  log(`Updated manifests (auto-manifest touched: ${touchedAuto})`);

  // 6. Build.
  sh('npm run build', { stdio: 'inherit' });

  // 7. Verify prerender.
  const page = join(ROOT, 'dist', 'blog', post.slug, 'index.html');
  const html = existsSync(page) ? readFileSync(page, 'utf8') : '';
  const unsplashId = (oldUnsplash.match(/photo-[a-z0-9]+/) || [''])[0];
  if (!html.includes(`${post.slug}${ext}`) || (unsplashId && html.includes(unsplashId))) {
    log('ABORT: prerender verification failed — dist page missing new image or still has old one.');
    process.exit(1);
  }
  log('Prerender verified.');

  // 8. Commit + push (only the intended files).
  sh(`git add "data/blog-posts.json" "src/data/auto-blog-posts.json" "public/blog-img/${post.slug}${ext}" dist/`);
  const shortTopic = post.slug.replace(/-/g, ' ');
  sh(`git commit -m "Swap hero image on ${shortTopic} blog post to match topic"`);
  sh('git push origin main');
  const hash = sh('git rev-parse --short HEAD').trim();
  log(`Pushed ${hash} — live. DONE.`);
} catch (e) {
  log('ERROR: ' + (e.stack || e.message || String(e)));
  process.exit(1);
}
