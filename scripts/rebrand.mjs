#!/usr/bin/env node
/**
 * Mechanically renames the hub city baked into route slugs and headline text
 * (e.g. "charlotte-nc" -> "austin-tx", "Charlotte" -> "Austin") across the
 * routing/linking skeleton: src/App.tsx, src/components/**, src/pages/**,
 * and server.ts.
 *
 * This does NOT touch the hand-authored landmark/hospital/FAQ copy inside
 * individual city pages, or any bare state-code text (e.g. "NC" in legal
 * disclaimers) — those need manual review per TEMPLATE_SETUP.md. This only
 * fixes the mechanical routing/linking so the site doesn't 404 or say the
 * old city name in the nav/hero/schema after a rename.
 *
 * Usage:
 *   node scripts/rebrand.mjs --city=Austin --state=TX --slug=austin-tx [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

const OLD_CITY = 'Charlotte';
const OLD_SLUG = 'charlotte-nc';

function parseArgs() {
  const args = Object.fromEntries(
    process.argv.slice(2).map(a => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v ?? true];
    })
  );
  if (!args.city || !args.state || !args.slug) {
    console.error('Usage: node scripts/rebrand.mjs --city=Austin --state=TX --slug=austin-tx [--dry-run]');
    process.exit(1);
  }
  return { newCity: args.city, newState: args.state.toUpperCase(), newSlug: args.slug.toLowerCase(), dryRun: !!args['dry-run'] };
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function targetFiles() {
  const files = [path.join(repoRoot, 'server.ts')];
  walk(path.join(repoRoot, 'src'), files);
  return [...new Set(files)].filter(f => fs.existsSync(f));
}

function main() {
  const { newCity, newState, newSlug, dryRun } = parseArgs();
  const oldSlugPattern = new RegExp(`\\b${OLD_SLUG}\\b`, 'g');
  const oldCityPattern = new RegExp(`\\b${OLD_CITY}\\b`, 'g');

  let filesChanged = 0;
  let slugHits = 0;
  let cityHits = 0;

  for (const file of targetFiles()) {
    const original = fs.readFileSync(file, 'utf-8');
    let updated = original;

    updated = updated.replace(oldSlugPattern, () => { slugHits++; return newSlug; });
    updated = updated.replace(oldCityPattern, () => { cityHits++; return newCity; });

    if (updated !== original) {
      filesChanged++;
      if (!dryRun) fs.writeFileSync(file, updated, 'utf-8');
      console.log(`${dryRun ? '[dry-run] would update' : 'updated'}: ${path.relative(repoRoot, file)}`);
    }
  }

  console.log(`\n${OLD_SLUG} -> ${newSlug}: ${slugHits} occurrence(s)`);
  console.log(`${OLD_CITY} -> ${newCity}: ${cityHits} occurrence(s)`);
  console.log(`${filesChanged} file(s) ${dryRun ? 'would be' : ''} changed.`);
  console.log(`\nNote: bare state-code text (e.g. "NC") and hand-authored city-page copy (landmarks, hospitals, FAQs) were NOT touched — see TEMPLATE_SETUP.md for what's still manual.`);
  if (!dryRun) {
    console.log(`\nRemember to also update src/config/business.ts: hubCity: '${newCity}', hubState: '${newState}'.`);
  }
}

main();
