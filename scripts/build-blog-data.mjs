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
    contentHtml: p.bodyHtml,
  }));

mkdirSync(join(ROOT, 'src', 'data'), { recursive: true });
writeFileSync(join(ROOT, 'src', 'data', 'auto-blog-posts.json'), JSON.stringify(out, null, 2) + '\n', 'utf-8');
console.log(`✓ Wrote ${out.length} posts to src/data/auto-blog-posts.json`);
out.forEach(p => console.log(`  - ${p.date}  ${p.title}`));
