/**
 * Transforms data/blog-posts.json (authoring manifest) into
 * src/data/auto-blog-posts.json (consumed by the React blog: Blog.tsx +
 * BlogPost.tsx). New posts flow: append to data/blog-posts.json → run this →
 * vite build. Existing hardcoded posts in Blog.tsx/BlogPost.tsx are untouched.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const src = JSON.parse(readFileSync(join(ROOT, 'data', 'blog-posts.json'), 'utf-8'));

const fmt = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

// Match the styling the hand-written posts in BlogPost.tsx use, so data-driven
// posts look identical (bordered H2s, brand links, consistent spacing).
function styleHtml(html) {
  return html
    .replace(/<h2[^>]*>/g, '<h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 border-b-2 border-slate-900 pb-2 font-sans">')
    .replace(/<h3[^>]*>/g, '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-4 font-sans">')
    .replace(/<p[^>]*>/g, '<p class="mb-6 text-lg text-slate-700 leading-relaxed">')
    .replace(/<ul[^>]*>/g, '<ul class="list-disc pl-6 space-y-2 mb-6 text-lg text-slate-700">')
    .replace(/<ol[^>]*>/g, '<ol class="list-decimal pl-6 space-y-2 mb-6 text-lg text-slate-700">')
    .replace(/<a href=/g, '<a class="text-brand-600 hover:underline font-semibold" href=');
}

const out = src
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .map(p => ({
    slug: p.slug,
    title: p.title,
    date: fmt(p.date),
    publishDate: p.date,
    excerpt: p.excerpt || p.metaDescription,
    imageUrl: p.heroImg,
    seoTitle: `${p.title} | Integrity Closings CLT`,
    seoDescription: p.metaDescription,
    contentHtml: styleHtml(p.bodyHtml),
  }));

mkdirSync(join(ROOT, 'src', 'data'), { recursive: true });
writeFileSync(join(ROOT, 'src', 'data', 'auto-blog-posts.json'), JSON.stringify(out, null, 2) + '\n', 'utf-8');
console.log(`✓ Wrote ${out.length} posts to src/data/auto-blog-posts.json`);
out.forEach(p => console.log(`  - ${p.date}  ${p.title}`));
