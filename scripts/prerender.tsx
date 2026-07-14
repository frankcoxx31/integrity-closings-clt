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
import { pageMeta } from '../src/seo/pageMeta';
import reviewsData from '../src/data/reviews.json';

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
  '/faq',
  '/resources',
  '/resources/acknowledgment-vs-jurat',
  '/resources/acceptable-id-nc',
  '/resources/what-is-mobile-notary',
  '/resources/notary-toolkit',
  '/services/business-documents',
  '/services/financial-documents',
  '/services/legal-documents',
  '/services/real-estate-documents',
  '/services/special-considerations',
  '/services/miscellaneous-documents',
  '/services/lender-provided-documents',
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
];

function applyMeta(html: string, route: string): string {
  const meta = pageMeta[route];
  if (!meta) return html;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${meta.description}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${meta.canonical}"`);
  return html;
}

// The LocalBusiness schema's aggregateRating is the same block on every
// page (it lives in index.html's <head>, shared by the whole shell), so
// this applies to every route the same way — sourced from reviews.json,
// which fetch-reviews.ts refreshes from the live Places API each build.
function applyAggregateRating(html: string): string {
  const { rating, userRatingsTotal } = reviewsData;
  if (rating == null || userRatingsTotal == null) return html;
  html = html.replace(/"ratingValue":\s*"[^"]*"/, `"ratingValue": "${rating}"`);
  html = html.replace(/"reviewCount":\s*"[^"]*"/, `"reviewCount": "${userRatingsTotal}"`);
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
}

main();
