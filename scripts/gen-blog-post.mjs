/**
 * Generates the blog for integrityclosingsclt.com from a manifest, reusing the
 * site's existing CSS (extracted from the hub page) so every post matches the
 * brand. Builds the /blog index, wires Apache routing (.htaccess), and adds
 * each post to sitemap.xml.
 *
 * Run from the repo root:
 *   node scripts/gen-blog-post.mjs
 *
 * Content lives in data/blog-posts.json. Idempotent: re-running overwrites the
 * HTML and de-dupes the .htaccess / sitemap blocks.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const BLOG_DIR = join(PUBLIC, 'blog');
const HUB = 'notary-service-locations-nc';
const PHONE_TEL = '9803724103';
const PHONE_DISPLAY = '980-372-4103';
const SITE = 'https://www.integrityclosingsclt.com';
const DEFAULT_IMG = '/blog-img/cat-notary-insights.png';

if (!existsSync(BLOG_DIR)) mkdirSync(BLOG_DIR, { recursive: true });

// ─── Reuse the site's CSS (extract <style> from the hub page) ─────────────────
const hubHtml = readFileSync(join(PUBLIC, `${HUB}.html`), 'utf-8');
const BASE_CSS = (hubHtml.match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1];

// Blog-specific styling, using this site's CSS variables (with safe fallbacks).
const BLOG_CSS = `
    /* blog additions */
    .blog-wrap { max-width: 780px; margin: 0 auto; padding: 0 20px; }
    #breadcrumb { background: var(--bg-alt, #f8fafc); border-bottom: 1px solid var(--border, #e2e8f0); padding: 14px 0; }
    .crumbs { font-size: 12px; color: var(--text-muted, #64748b); }
    .crumbs a { color: var(--primary, #2563eb); text-decoration: none; }
    .crumbs a:hover { color: var(--navy, #172554); }
    #article { padding: 48px 0 64px; }
    .article-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--secondary, #f97316); margin-bottom: 12px; }
    .article-title { font-family: var(--font-display, 'Playfair Display', Georgia, serif); font-size: clamp(1.9rem, 5vw, 2.7rem); color: var(--navy, #172554); font-weight: 700; line-height: 1.15; margin-bottom: 14px; }
    .article-meta { font-size: 13px; color: var(--text-muted, #64748b); margin-bottom: 26px; }
    .article-hero-img { width: 100%; border-radius: 10px; margin-bottom: 32px; box-shadow: var(--shadow-md, 0 4px 16px rgba(0,0,0,.09)); }
    .article-body { color: var(--text-secondary, #475569); font-size: 16px; line-height: 1.85; }
    .article-body h2 { font-family: var(--font-display, 'Playfair Display', Georgia, serif); font-size: 1.55rem; color: var(--navy, #172554); font-weight: 700; margin: 36px 0 14px; }
    .article-body h3 { font-size: 1.15rem; color: var(--navy, #172554); font-weight: 700; margin: 26px 0 10px; }
    .article-body p { margin: 0 0 18px; }
    .article-body ul, .article-body ol { margin: 0 0 18px 22px; }
    .article-body li { margin-bottom: 8px; }
    .article-body a { color: var(--primary, #2563eb); font-weight: 600; }
    .article-body a:hover { color: var(--navy, #172554); }
    .article-body strong { color: var(--navy, #172554); }
    .article-cta { background: var(--bg-alt, #f8fafc); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 28px; margin: 40px 0 0; text-align: center; }
    .article-cta p { font-size: 15px; color: var(--text-secondary, #475569); margin-bottom: 16px; }
    .article-cta a { display: inline-block; margin: 4px; padding: 12px 26px; border-radius: 8px; font-weight: 700; text-decoration: none; }
    .cta-call { background: var(--navy, #172554); color: #fff; }
    .cta-book { background: var(--secondary, #f97316); color: #fff; }
    /* blog index */
    #blog-hero { background: var(--hero-bg, #0f172a); color: #fff; padding: 60px 0; text-align: center; }
    #blog-hero h1 { font-family: var(--font-display, 'Playfair Display', Georgia, serif); font-size: clamp(2rem, 5vw, 3rem); margin: 0 0 12px; }
    #blog-hero p { color: #cbd5e1; max-width: 640px; margin: 0 auto; font-size: 16px; line-height: 1.7; }
    #blog-list { padding: 56px 0 64px; }
    .post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 26px; max-width: 1080px; margin: 0 auto; padding: 0 20px; }
    .post-card { background: var(--bg-card, #fff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,.07)); transition: transform .2s, box-shadow .2s; display: flex; flex-direction: column; }
    .post-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md, 0 4px 16px rgba(0,0,0,.09)); }
    .post-card img { width: 100%; height: 180px; object-fit: cover; }
    .post-card-body { padding: 22px; display: flex; flex-direction: column; flex: 1; }
    .post-card .cat { font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--secondary, #f97316); margin-bottom: 8px; }
    .post-card h3 { font-family: var(--font-display, 'Playfair Display', Georgia, serif); font-size: 1.25rem; color: var(--navy, #172554); font-weight: 700; line-height: 1.25; margin-bottom: 10px; }
    .post-card .excerpt { font-size: 14px; color: var(--text-secondary, #475569); line-height: 1.7; flex: 1; }
    .post-card .read { margin-top: 14px; font-size: 13px; font-weight: 700; color: var(--primary, #2563eb); text-decoration: none; }
    .post-card .date { font-size: 12px; color: var(--text-muted, #64748b); margin-top: 6px; }
`;

const esc = (s) => (s || '').toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const fmtDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const HEAD_FONTS = `  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet" />`;

const NAV = `
<nav class="navbar" id="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="/" class="nav-logo"><img src="/logo.jpg" alt="Integrity Closings CLT" /></a>
      <div class="nav-actions">
        <a href="/blog" class="nav-call">Blog</a>
        <a href="tel:${PHONE_TEL}" class="nav-call">📞 ${PHONE_DISPLAY}</a>
        <a href="/#book" class="nav-book">Book Now</a>
      </div>
    </div>
  </div>
</nav>`;

const FOOTER = `
<footer class="footer">
  <p>&copy; ${new Date().getFullYear()} Integrity Closings CLT &mdash; Frank Lamon Coxx, Certified Notary Signing Agent &bull; <a href="/blog">Notary Blog</a> &bull; <a href="/">Back to Home</a></p>
</footer>`;

const CTA = `
<div class="article-cta">
  <p>Need a document notarized in the Charlotte or Monroe area? Frank Coxx comes to you &mdash; home, office, hospital, or care facility, 7 days a week.</p>
  <a href="tel:${PHONE_TEL}" class="cta-call">📞 Call ${PHONE_DISPLAY}</a>
  <a href="/#book" class="cta-book">Book Online</a>
</div>`;

function postPage(p) {
  const url = `${SITE}/blog/${p.slug}`;
  const img = p.heroImg || DEFAULT_IMG;
  const title = `${p.title} | Integrity Closings CLT`;
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${url}#post`,
    headline: p.title, description: p.metaDescription, datePublished: p.date, dateModified: p.date,
    url, image: `${SITE}${img}`,
    author: { '@type': 'Person', name: 'Frank Coxx' },
    publisher: { '@type': 'Organization', name: 'Integrity Closings CLT', logo: { '@type': 'ImageObject', url: `${SITE}/logo.jpg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(p.metaDescription)}" />
  <link rel="canonical" href="${url}" />
  <meta name="robots" content="index, follow" />
  ${p.keywords && p.keywords.length ? `<meta name="keywords" content="${attr(p.keywords.join(', '))}" />` : ''}
  <meta property="og:title" content="${attr(p.title)}" />
  <meta property="og:description" content="${attr(p.metaDescription)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="${SITE}${img}" />
  <meta property="article:published_time" content="${p.date}" />
${HEAD_FONTS}
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
  <style>${BASE_CSS}${BLOG_CSS}</style>
</head>
<body>
${NAV}
<section id="breadcrumb">
  <div class="container">
    <p class="crumbs"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/blog">Blog</a> &nbsp;/&nbsp; ${esc(p.title)}</p>
  </div>
</section>

<article id="article">
  <div class="blog-wrap">
    <p class="article-eyebrow">${esc(p.category || 'Notary Insights')}</p>
    <h1 class="article-title">${esc(p.title)}</h1>
    <p class="article-meta">By Frank Coxx &middot; ${fmtDate(p.date)}</p>
    <img class="article-hero-img" src="${img}" alt="${attr(p.title)}" />
    <div class="article-body">
${p.bodyHtml}
    </div>
    ${CTA}
  </div>
</article>
${FOOTER}
</body>
</html>
`;
}

function indexPage(posts) {
  const url = `${SITE}/blog`;
  const cards = posts.map(p => {
    const img = p.heroImg || DEFAULT_IMG;
    return `      <div class="post-card">
        <a href="/blog/${p.slug}"><img src="${img}" alt="${attr(p.title)}" /></a>
        <div class="post-card-body">
          <span class="cat">${esc(p.category || 'Notary Insights')}</span>
          <h3><a href="/blog/${p.slug}" style="color:inherit;text-decoration:none">${esc(p.title)}</a></h3>
          <p class="excerpt">${esc(p.excerpt || p.metaDescription)}</p>
          <a class="read" href="/blog/${p.slug}">Read more &rarr;</a>
          <p class="date">${fmtDate(p.date)}</p>
        </div>
      </div>`;
  }).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Notary Blog | Charlotte & Monroe NC | Integrity Closings CLT</title>
  <meta name="description" content="Mobile notary tips, loan signing guides, and estate & hospital notarization advice for the Charlotte and Monroe, NC area from Frank Coxx, Certified Notary Signing Agent." />
  <link rel="canonical" href="${url}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Notary Blog | Integrity Closings CLT" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${SITE}${DEFAULT_IMG}" />
${HEAD_FONTS}
  <style>${BASE_CSS}${BLOG_CSS}</style>
</head>
<body>
${NAV}
<section id="blog-hero">
  <div class="container">
    <h1>The Integrity Closings Notary Blog</h1>
    <p>Practical tips and guides on mobile notary services, loan signings, estate documents, and hospital notarizations across the Charlotte and Monroe, NC area.</p>
  </div>
</section>
<section id="blog-list">
  <div class="post-grid">
${cards || '      <p>New posts coming soon.</p>'}
  </div>
</section>
${FOOTER}
</body>
</html>
`;
}

// ─── Load manifest & generate ─────────────────────────────────────────────────
const manifestPath = join(ROOT, 'data', 'blog-posts.json');
const posts = JSON.parse(readFileSync(manifestPath, 'utf-8')).slice().sort((a, b) => (a.date < b.date ? 1 : -1));

for (const p of posts) {
  writeFileSync(join(BLOG_DIR, `${p.slug}.html`), postPage(p), 'utf-8');
  console.log(`✓ blog/${p.slug}.html`);
}
writeFileSync(join(BLOG_DIR, 'index.html'), indexPage(posts), 'utf-8');
console.log('✓ blog/index.html');

// ─── Update .htaccess (add blog routes before the catch-all) ──────────────────
{
  const path = join(PUBLIC, '.htaccess');
  let ht = readFileSync(path, 'utf-8');
  const marker = '# --- blog pages (generated) ---';
  const escMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  ht = ht.replace(new RegExp(`\\n*  ${escMarker}[\\s\\S]*?# --- end blog pages ---\\n?`, 'g'), '\n');
  const rules = ['  RewriteRule ^blog/?$ /blog/index.html [L]']
    .concat(posts.map(p => `  RewriteRule ^blog/${p.slug}/?$ /blog/${p.slug}.html [L]`))
    .join('\n');
  const block = `\n  ${marker}\n${rules}\n  # --- end blog pages ---\n`;
  ht = ht.replace(/(\s*RewriteCond %\{REQUEST_FILENAME\} !-f)/, `${block}$1`);
  writeFileSync(path, ht, 'utf-8');
  console.log('✓ .htaccess updated');
}

// ─── Update sitemap.xml ───────────────────────────────────────────────────────
{
  const path = join(PUBLIC, 'sitemap.xml');
  let sm = readFileSync(path, 'utf-8');
  const entries = [{ loc: `${SITE}/blog`, freq: 'weekly', pri: '0.7', date: posts[0]?.date }]
    .concat(posts.map(p => ({ loc: `${SITE}/blog/${p.slug}`, freq: 'monthly', pri: '0.6', date: p.date })));
  for (const e of entries) {
    if (sm.includes(`<loc>${e.loc}</loc>`)) continue;
    const entry = `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.date || new Date().toISOString().slice(0,10)}</lastmod>\n    <changefreq>${e.freq}</changefreq>\n    <priority>${e.pri}</priority>\n  </url>\n`;
    sm = sm.replace('</urlset>', `${entry}</urlset>`);
  }
  writeFileSync(path, sm, 'utf-8');
  console.log('✓ sitemap.xml updated');
}

console.log(`\nDone. ${posts.length} post(s) + index generated.`);
