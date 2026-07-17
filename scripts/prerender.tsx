/**
 * Build-time static HTML generation.
 *
 * This site is a client-rendered Vite/React SPA — dist/index.html ships with
 * an empty <div id="root">. Crawlers that don't execute JavaScript (GPTBot,
 * ClaudeBot, PerplexityBot, and similar) see a blank page and index nothing.
 * Googlebot renders JS and is unaffected, but that means all the on-page SEO
 * content only reaches Google today.
 *
 * This script runs after `vite build` (see package.json's "build" script).
 * For each route below, it renders <AppContent/> under a StaticRouter with
 * react-dom/server, then writes the real HTML into dist/<route>/index.html
 * (dist/index.html itself for "/"). express.static in server.ts serves these
 * directly — no server-side rendering at request time, just a static file
 * per route, same approach as react-snap/Next static export.
 *
 * The client still boots normally via main.tsx's createRoot().render() (not
 * hydrateRoot), so real visitors get the exact same interactive app as
 * before; this only changes what a non-JS HTTP GET sees on first byte.
 *
 * Scope: this covers the site's static marketing/informational routes.
 * Deliberately excluded — /book, /booking, /calculator (interactive,
 * calendar/API-backed, low crawler-discovery value) and /blog + /blog/:slug
 * (a large ad-hoc per-slug content file; enumerating it safely is follow-up
 * work, not bundled into this pass).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppContent } from '../src/App';
import { pageMeta, type PageMeta } from '../src/seo/pageMeta';
import { businessConfig } from '../src/config/business';
import reviewsData from '../src/data/reviews.json';
import autoPosts from '../src/data/auto-blog-posts.json';
import { manualBlogPosts } from '../src/data/manual-blog-posts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');
const shellPath = path.join(distDir, 'index.html');

const routes = [
  '/',
  '/mobile-notary-charlotte-nc',
  '/hospital-notary-charlotte-nc',
  '/nursing-home-notary-charlotte-nc',
  '/estate-notary-charlotte-nc',
  '/after-hours-mobile-notary-charlotte-nc',
  '/loan-signing-agent-charlotte-nc',
  '/general-notary-charlotte-nc',
  '/power-of-attorney-estate-documents-charlotte-nc',
  '/areas-served',
  '/about',
  '/contact',
  '/blog',
  '/faq',
  '/resources',
  '/resources/acknowledgment-vs-jurat',
  '/resources/acceptable-id-nc',
  '/resources/what-is-mobile-notary',
  '/resources/notary-toolkit',
  '/resources/notary-ai-guides',
  '/services/business-documents',
  '/services/financial-documents',
  '/services/legal-documents',
  '/services/real-estate-documents',
  '/services/special-considerations',
  '/services/miscellaneous-documents',
  '/services/lender-provided-documents',
  '/services/seller-documents',
  '/locations/charlotte',
  '/locations/concord',
  '/locations/gastonia',
  '/locations/locust',
  '/locations/matthews',
  '/locations/midland',
  '/locations/monroe',
  '/locations/salisbury',
  '/locations/mint-hill-loan-signing-agent',
  '/locations/matthews-loan-signing-agent',
  '/locations/concord-loan-signing-agent',
  '/locations/cabarrus-county-loan-signing-agent',
  '/locations/union-county-loan-signing-agent',
  '/title-company-attorney-closing-support-charlotte-nc',
  '/privacy-policy',
  '/terms-of-service',
  '/disclaimer',
  '/service-agreement',
];

// Blog posts are data-driven (auto-blog-posts.json + manual-blog-posts.ts)
// rather than one static route per file, so their meta is built here instead
// of living in pageMeta.ts. Every post gets a real, unique title/description
// baked into its prerendered HTML — previously /blog/:slug wasn't prerendered
// at all, so crawlers saw the homepage's content on every blog URL.
const blogMeta: Record<string, PageMeta> = {};
for (const post of autoPosts) {
  const route = `/blog/${post.slug}`;
  routes.push(route);
  blogMeta[route] = {
    title: post.seoTitle,
    description: post.seoDescription,
    canonical: `${businessConfig.domain}${route}`,
  };
}
for (const post of manualBlogPosts) {
  const route = `/blog/${post.slug}`;
  routes.push(route);
  blogMeta[route] = {
    title: post.seoTitle || `${post.title} | ${businessConfig.name}`,
    description: post.seoDescription || post.excerpt.slice(0, 157).trim() + (post.excerpt.length > 157 ? '...' : ''),
    canonical: `${businessConfig.domain}${route}`,
  };
}

function applyMeta(html: string, route: string): string {
  const meta = pageMeta[route] || blogMeta[route];
  if (!meta) return html;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${meta.description}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${meta.canonical}"`);
  // Open Graph tags default to the homepage's values in index.html's shell
  // (shared by every prerendered route) — without this every non-homepage
  // page shows the homepage's title/description/url when shared on social.
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${meta.title}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${meta.description}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${meta.canonical}"`);
  // Twitter Cards mirror the same per-page title/description as Open Graph.
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${meta.title}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${meta.description}"`);
  return html;
}

// The LocalBusiness schema's aggregateRating is the same block on every
// page (it lives in index.html's <head>, shared by the whole shell), so
// this applies to every route the same way — sourced from reviews.json.
function applyAggregateRating(html: string): string {
  const { rating, userRatingsTotal } = reviewsData;
  if (rating == null || userRatingsTotal == null) return html;
  html = html.replace(/"ratingValue":\s*"[^"]*"/, `"ratingValue": "${rating}"`);
  html = html.replace(/"reviewCount":\s*"[^"]*"/, `"reviewCount": "${userRatingsTotal}"`);
  return html;
}

// React 19 automatically emits a <link rel="preload" as="image"> for every
// <img> it renders, inserted at the top of <div id="root"> — on the
// homepage that's ~20 below-the-fold service/location card images, all
// competing for bandwidth with the actual largest-contentful-paint element.
// Hero.tsx renders its hero image as a CSS background-image (not an <img>),
// so it never got one of these hints at all despite being the one image
// that actually needs to load first. Strip the auto-generated ones and
// inject a single correct high-priority preload for the routes that use
// hero-bj.jpg as their above-the-fold visual.
const HERO_IMAGE_ROUTES = new Set(['/', '/about']);

function fixImagePreloads(html: string, route: string): string {
  html = html.replace(/<link rel="preload" as="image"[^>]*\/>/g, '');
  if (HERO_IMAGE_ROUTES.has(route)) {
    html = html.replace(
      '</title>',
      '</title>\n    <link rel="preload" as="image" href="/hero-bj.jpg" fetchpriority="high" />'
    );
  }
  return html;
}

function main() {
  if (!existsSync(shellPath)) {
    console.error('[prerender] dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }
  const shell = readFileSync(shellPath, 'utf-8');

  let succeeded = 0;
  const failed: string[] = [];

  for (const route of routes) {
    try {
      const appHtml = renderToString(
        <StaticRouter location={route}>
          <AppContent />
        </StaticRouter>
      );
      let html = shell.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      html = applyMeta(html, route);
      html = applyAggregateRating(html);
      html = fixImagePreloads(html, route);

      const outPath = route === '/'
        ? shellPath
        : path.join(distDir, route.replace(/^\//, ''), 'index.html');

      mkdirSync(path.dirname(outPath), { recursive: true });
      writeFileSync(outPath, html, 'utf-8');
      succeeded++;
    } catch (err) {
      failed.push(route);
      console.warn(`[prerender] Skipped ${route} — render failed:`, err instanceof Error ? err.message : err);
    }
  }

  console.log(`[prerender] Prerendered ${succeeded}/${routes.length} routes into dist/.`);
  if (failed.length) {
    console.warn(`[prerender] Routes left as client-only (no regression, just not yet static): ${failed.join(', ')}`);
  }

  // A literal dist/404.html for server.ts's catch-all to serve (with a real
  // 404 status) for any path that isn't a known route or static asset.
  // "/__404__" matches nothing in the route table, so NotFound renders.
  try {
    const notFoundHtml = renderToString(
      <StaticRouter location="/__404__">
        <AppContent />
      </StaticRouter>
    );
    let html404 = shell.replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`);
    html404 = html404.replace(/<title>[^<]*<\/title>/, `<title>Page Not Found | ${businessConfig.name}</title>`);
    html404 = html404.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="The page you're looking for doesn't exist or may have moved."`);
    html404 = html404.replace(/<meta name="robots" content="[^"]*"/, `<meta name="robots" content="noindex, follow"`);
    html404 = fixImagePreloads(html404, '/__404__');
    writeFileSync(path.join(distDir, '404.html'), html404, 'utf-8');
    console.log('[prerender] Wrote dist/404.html');
  } catch (err) {
    console.warn('[prerender] Failed to write dist/404.html:', err instanceof Error ? err.message : err);
  }
}

main();
