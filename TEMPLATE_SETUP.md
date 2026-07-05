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

## 5. Write new city-page copy — including the renamed hub city's own page

For each city the new customer actually serves, using the existing
`CityPageLayout` (general notary pages) or `LoanSigningCityLayout` (loan
signing pages) component as the template:
- Real local landmarks, hospital/nursing home names, and FAQ copy — this is genuine local-SEO content, not boilerplate, and is the main value-add of each resale
- Pass an accurate `geo={{ lat, lng }}` prop to `CityPageLayout` for that city (previously this was a real bug — every city reported Charlotte's coordinates — now fixed, but only if each page passes its own)
- Add the route in `src/App.tsx`, a card in `src/components/Locations.tsx`, and (if it needs its own SEO meta tags) an entry in `server.ts`'s `pageMeta`

**Important — verified via a dry run:** step 2's rebrand script only renames
*text*. The hub city's own page (e.g. the file that was `Charlotte.tsx`,
now renamed to your new city) still has the **old city's real landmarks,
hospital names, and `geo` coordinates** — the script can't know a different
city's actual hospitals or airport code. Treat the renamed hub-city page
exactly like a brand-new city page: rewrite its landmarks/hospitals/FAQs and
fix its `geo` coordinates. Don't assume the rename script made it accurate —
it only made it not crash.

**Also decide what to do with the other pre-existing city pages**
(`Concord.tsx`, `Gastonia.tsx`, `Locust.tsx`, `Matthews.tsx`, `Midland.tsx`,
`Monroe.tsx`, `Salisbury.tsx`, and the `*LoanSigning.tsx` variants). If the
new customer doesn't serve a North Carolina multi-city network, these need
to be deleted (along with their routes in `App.tsx` and cards in
`Locations.tsx`) or repurposed into that customer's own nearby cities —
otherwise the resold site will keep working NC city pages advertising the
wrong business's service area.

## 6. Rewrite the individual SEO content pages (bigger than it sounds)

This is **not** a quick find-and-replace — verified by actually doing it for
a demo customer. These pages (`AfterHoursNotary.tsx`, `AreasServed.tsx`,
`BlogPost.tsx`, `BookLanding.tsx`, `EstateNotary.tsx`, `HospitalNotary.tsx`,
`LoanSigningAgent.tsx`, `MobileNotaryServices.tsx`, `NursingHomeNotary.tsx`,
`PowerOfAttorneyEstateDocuments.tsx`, `TitleAttorneySupport.tsx`,
`WelcomePopup.tsx`) each mix together, in the same paragraphs:
- The phone number, in at least 4 different text formats (`9803724103`, `980-372-4103`, `(980) 372-4103`, `(980)-372-4103`) — and `WelcomePopup.tsx` also has a *second, different* number (`980-505-8050`, a dedicated text/SMS line) that isn't in `business.ts` at all yet
- The business name and owner name in prose (e.g. "Call or text Integrity Closings CLT at...", "ask for Frank Coxx")
- Bare state-code text next to the city name (e.g. document titles literally saying "[NewCity] NC" after renaming to a different state — the rebrand script correctly leaves state text alone, but that means every one of these needs a human pass)
- County names and service-area lists specific to the old business's NC counties

Treat this step like step 5, not like a simple grep: read each page, not
just pattern-match it. A `grep -rl "9803724103" src` after step 2 will find
the main phone number, but won't find the SMS number, business name, owner
name, or mismatched state text sitting in the same sentence.

## 7. Fix hardcoded domain/canonical references (not previously wired)

**19 files** (`server.ts` plus 18 files under `src/pages/`, including every
file in `src/pages/services/`) set a client-side canonical URL or schema
`url` field via `document.querySelector('link[rel="canonical"]').href = 'https://www.integrityclosingsclt.com/...'`
or similar, with the old domain hardcoded. This isn't cosmetic — an
unfixed canonical tag pointing at the *old* business's domain is a real SEO
problem (search engines may treat the new page as duplicate/thin content
pointing elsewhere). Find them with `grep -rl "integrityclosingsclt.com" src server.ts`
and replace with `businessConfig.domain`. This wasn't part of the original
config wiring pass and should be treated as its own checklist item, not
folded into step 6.

## 8. Swap assets and environment

- Replace `/public/logo.jpg`, `/public/hero-bj.jpg`, the notary's headshot, and any city photos referenced in `src/components/Locations.tsx`
- Set up a fresh `.env` (Firebase project, Google Calendar service account, Resend API key + verified sending domain) for the new customer — see `.env.example`
- `src/components/AIChatbot.tsx` has an AI assistant persona hardcoded as "Mr. Frank" (name, greeting text, avatar alt text) — rename or restyle this for the new notary if they want a different assistant persona.
