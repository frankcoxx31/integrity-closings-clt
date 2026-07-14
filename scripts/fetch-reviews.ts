/**
 * Build-time fetch of live Google Business Profile reviews via the Places
 * API's Place Details endpoint (fields: reviews, rating, user_ratings_total).
 * Writes src/data/reviews.json, which Reviews.tsx renders on the homepage
 * and scripts/prerender.tsx reads to set the LocalBusiness schema's
 * aggregateRating.
 *
 * GOOGLE_PLACES_API_KEY must be set in the build environment. It is read
 * with plain `process.env` in this Node script only — never passed through
 * Vite's `define` or any `VITE_`-prefixed variable, so it never reaches the
 * client bundle. Only the review content (already public on Google Maps)
 * ends up in reviews.json and, from there, in the built site.
 *
 * Fails gracefully: if the key is missing, the request errors, or the API
 * responds with anything other than status "OK", this script logs a
 * warning and leaves the existing reviews.json untouched rather than
 * overwriting good data or breaking the build.
 *
 * Note: the legacy Places API caps the `reviews` field at 5 results — this
 * is a documented Google limitation, not a bug here.
 */

import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outPath = path.join(__dirname, '..', 'src', 'data', 'reviews.json');

const PLACE_ID = 'ChIJPc0MmfQjxQkRXEws2youoak';

interface GooglePlaceReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface ReviewsFile {
  rating: number | null;
  userRatingsTotal: number | null;
  reviews: {
    authorName: string;
    rating: number;
    relativeTimeDescription: string;
    text: string;
    time: number;
  }[];
  fetchedAt: string;
}

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.warn('[fetch-reviews] GOOGLE_PLACES_API_KEY not set — skipping fetch, keeping existing reviews.json.');
    return;
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(PLACE_ID)}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[fetch-reviews] Places API returned HTTP ${res.status} — keeping existing reviews.json.`);
      return;
    }

    const data = await res.json();
    if (data.status !== 'OK' || !data.result) {
      console.warn(`[fetch-reviews] Places API status "${data.status}"${data.error_message ? `: ${data.error_message}` : ''} — keeping existing reviews.json.`);
      return;
    }

    const result = data.result;
    const out: ReviewsFile = {
      rating: typeof result.rating === 'number' ? result.rating : null,
      userRatingsTotal: typeof result.user_ratings_total === 'number' ? result.user_ratings_total : null,
      reviews: ((result.reviews as GooglePlaceReview[]) || []).map((r) => ({
        authorName: r.author_name,
        rating: r.rating,
        relativeTimeDescription: r.relative_time_description,
        text: r.text,
        time: r.time,
      })),
      fetchedAt: new Date().toISOString(),
    };

    writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf-8');
    console.log(`[fetch-reviews] Fetched ${out.reviews.length} reviews, rating ${out.rating} (${out.userRatingsTotal} total). Saved to ${path.relative(process.cwd(), outPath)}.`);
  } catch (err) {
    console.warn('[fetch-reviews] Fetch failed — keeping existing reviews.json.', err instanceof Error ? err.message : err);
  }
}

main();
