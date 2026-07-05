# Setting this site up for a new customer

This codebase started as the live site for Integrity Closings CLT (a mobile
notary in Charlotte, NC) and was templatized so it can be customized and
resold to other notaries/local service businesses. Business identity,
pricing, and colors are centralized — but city-page copy (landmarks,
hospitals, FAQs) and blog content are hand-authored local SEO material that
has to be rewritten per customer regardless of tooling, so those stay manual.

Work through these steps in order for each new customer.

## 1. Edit `src/config/business.ts`

This is the single source of truth for:
- Business name, owner name, phone, email, domain
- `hubCity` / `hubState` — the primary city baked into route slugs and headlines
- `hubGeo` — the fallback schema.org coordinates for city pages that don't pass their own
- `address` / `officeLocation` — the notary's real physical address and mileage-calculator origin (may differ from `hubCity`, which is a marketing/SEO hub name, not necessarily where the notary lives)
- `hours`, `pricing` (notary fee, IRS mileage rate), and `reviews` (placeholder testimonials)

Edit everything except `hubCity`/`hubState` here first — those are handled by the script in step 2.

## 2. Run the rebrand script

```
node scripts/rebrand.mjs --city=Austin --state=TX --slug=austin-tx
```

This renames the old hub city across routes, nav, headlines, and schema
markup, and physically renames the hub city's own page file
(`src/pages/locations/Charlotte.tsx` → `src/pages/locations/Austin.tsx`).
Run with `--dry-run` first to preview. After running it for real:

- Update `hubState` in `src/config/business.ts` manually (the script only renames the city name/slug text, not the two-letter state code, since that's too ambiguous to touch safely — see below).
- Run `npx tsc --noEmit` to confirm nothing broke.

**What the script does NOT touch (and why):**
- Bare state-code text (e.g. "NC" in the notary-fee legal disclaimer in `QuoteCalculator.tsx`) — renaming a state code as free text is too risky to do blindly, and state-specific notary law needs a human read-through anyway.
- Blog post slugs and content in `src/pages/Blog.tsx` / `BlogPost.tsx` / `src/drafts/` — these are full articles, not identity strings.
- Hand-authored city-page copy (landmarks, hospital names, FAQs) inside each `src/pages/locations/*.tsx` file — see step 5.

## 3. Re-brand colors (optional)

Colors are aliased to semantic tokens in `src/index.css`'s `@theme` block
(`--color-brand-*`, `--color-accent-*`, `--color-secondary-*`), currently
pointing at the original navy/gold Tailwind palette. To give a new customer
their own brand colors, edit only this block — no component files need to
change.

## 4. Manually edit `index.html`

This file is static and can't read from `business.ts` without a build step,
so update by hand:
- `<title>` and `<meta name="description">`
- `<link rel="canonical">` and the `og:*` meta tags
- The `schema.org` `LocalBusiness` JSON-LD block (name, url, telephone, areaServed)
- **Analytics IDs** — `GTM-*`, `G-*` (GA4), and `AW-*` (Google Ads) are literally different Google accounts per customer. Replace all three or the new customer's traffic reports into the old business's accounts.

## 5. Write new city-page copy

For each city the new customer actually serves, using the existing
`CityPageLayout` (general notary pages) or `LoanSigningCityLayout` (loan
signing pages) component as the template:
- Real local landmarks, hospital/nursing home names, and FAQ copy — this is genuine local-SEO content, not boilerplate, and is the main value-add of each resale
- Pass an accurate `geo={{ lat, lng }}` prop to `CityPageLayout` for that city (previously this was a real bug — every city reported Charlotte's coordinates — now fixed, but only if each new page passes its own)
- Add the route in `src/App.tsx`, a card in `src/components/Locations.tsx`, and (if it needs its own SEO meta tags) an entry in `server.ts`'s `pageMeta`

## 6. Remaining scattered phone-number literals

A handful of individual content pages still have the old phone number
inline rather than pulling from config (found via `grep -rl "9803724103" src`
after step 2 — the rebrand script doesn't touch phone numbers, only the
city name/slug). As of this writing that's: `WelcomePopup.tsx`,
`AfterHoursNotary.tsx`, `AreasServed.tsx`, `BlogPost.tsx`, `BookLanding.tsx`,
`EstateNotary.tsx`, `HospitalNotary.tsx`, `LoanSigningAgent.tsx`,
`MobileNotaryServices.tsx`, `NursingHomeNotary.tsx`,
`PowerOfAttorneyEstateDocuments.tsx`, `TitleAttorneySupport.tsx`. Grep for
the old number and swap it for `businessConfig.phone.display`/`.tel` in each.

## 7. Swap assets and environment

- Replace `/public/logo.jpg`, `/public/hero-bj.jpg`, the notary's headshot, and any city photos referenced in `src/components/Locations.tsx`
- Set up a fresh `.env` (Firebase project, Google Calendar service account, Resend API key + verified sending domain) for the new customer — see `.env.example`
