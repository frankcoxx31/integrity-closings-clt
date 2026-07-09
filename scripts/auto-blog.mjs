/**
 * Auto-writes one new notary blog post using the Anthropic API, appends it to
 * data/blog-posts.json, and (via the workflow) triggers gen-blog-post.mjs.
 *
 * Runs in GitHub Actions on a cron (Tue & Fri). Requires env ANTHROPIC_API_KEY.
 *
 *   node scripts/auto-blog.mjs
 *
 * Picks a topic-matched hero image from the existing /public library and avoids
 * repeating any title/slug already in the manifest.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const manifestPath = join(ROOT, 'data', 'blog-posts.json');

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) { console.error('Missing ANTHROPIC_API_KEY'); process.exit(1); }

// Category → topic-relevant AI hero image (custom, brand-matched, in /public/blog-img)
const CATEGORY_IMAGE = {
  'Estate & POA': '/blog-img/cat-estate-poa.png',
  'Loan Signings': '/blog-img/cat-loan-signings.png',
  'Hospital & Care': '/blog-img/cat-hospital-care.png',
  'Mobile Notary': '/blog-img/cat-mobile-notary.png',
  'Small Business': '/blog-img/cat-small-business.png',
  'Notary Insights': '/blog-img/cat-notary-insights.png',
};
const FALLBACK_IMAGE = '/blog-img/cat-notary-insights.png';

const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
const usedTitles = manifest.map(p => p.title);
const usedSlugs = new Set(manifest.map(p => p.slug));

const today = new Date().toISOString().slice(0, 10);

const prompt = `You write local-SEO blog posts for Integrity Closings CLT, a mobile notary business.

BUSINESS FACTS (use these; never invent others):
- Owner/author: Frank Coxx, Certified Notary Signing Agent (NSA)
- Based in Mint Hill, NC; serves the Charlotte metro and Monroe / Union County area
- Phone: 980-372-4103
- A notary verifies identity and witnesses signatures — a notary is NOT a lawyer and does not give legal advice or draft documents. Make this clear where relevant.

CATEGORIES (pick the best fit): Estate & POA, Loan Signings, Hospital & Care, Mobile Notary, Small Business, Notary Insights

INTERNAL LINKS you may use inside bodyHtml (use 2–4, choose relevant ones):
/service-locations-mobile-services-north-carolina, /mobile-notary-mint-hill-nc, /mobile-notary-matthews-nc, /mobile-notary-monroe-nc, /mobile-notary-charlotte-nc, /hospital-notary-charlotte-nc, /estate-notary-charlotte-nc, /loan-signing-agent-charlotte-nc, /after-hours-mobile-notary-charlotte-nc, /book

ALREADY PUBLISHED (do NOT repeat these topics or titles):
${usedTitles.map(t => '- ' + t).join('\n') || '(none yet)'}

TASK: Write ONE new, genuinely useful ~700-word post on a fresh topic relevant to a Charlotte-area mobile notary's customers (loan signings, estate/POA, hospital/care-facility signings, general notary questions, small-business docs, NC notary rules, same-day/after-hours service, etc.).

Return ONLY a raw JSON object (no markdown, no code fences) with EXACTLY these fields:
{
  "slug": "kebab-case-unique-keyword-rich",
  "title": "50-65 char title with the primary keyword",
  "metaDescription": "140-160 chars, include the keyword and a call to action",
  "category": "one of the categories above",
  "excerpt": "1-2 sentence teaser",
  "keywords": ["3-6 target phrases"],
  "bodyHtml": "The article body as HTML using <h2>, <h3>, <p>, <ul>/<li>, <strong>, and internal <a href> links. Indent for readability. Do NOT include an <h1> (the title is rendered separately). Do NOT include a call-to-action box (added automatically)."
}`;

const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-haiku-4-5',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  }),
});

if (!res.ok) {
  console.error('Anthropic API error:', res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const text = data.content?.[0]?.type === 'text' ? data.content[0].text : '';
const match = text.match(/\{[\s\S]*\}/);
if (!match) { console.error('No JSON in model response:\n', text); process.exit(1); }

let post;
try { post = JSON.parse(match[0]); }
catch (e) { console.error('Bad JSON from model:', e.message, '\n', match[0]); process.exit(1); }

// Ensure a unique slug
let slug = (post.slug || 'notary-post').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
if (usedSlugs.has(slug)) slug = `${slug}-${today}`;
post.slug = slug;

post.date = today;
post.heroImg = CATEGORY_IMAGE[post.category] || FALLBACK_IMAGE;

// Minimal validation
for (const f of ['title', 'metaDescription', 'category', 'excerpt', 'bodyHtml']) {
  if (!post[f]) { console.error(`Generated post missing "${f}" — aborting.`); process.exit(1); }
}
if (!Array.isArray(post.keywords)) post.keywords = [];

manifest.push(post);
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
console.log(`✓ New post added: "${post.title}"  (/blog/${post.slug}, img ${post.heroImg})`);
