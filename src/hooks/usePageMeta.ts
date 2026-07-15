import { useEffect } from 'react';
import type { PageMeta } from '../seo/pageMeta';

/**
 * Sets document.title and the description meta tag client-side, matching
 * the prerendered values in src/seo/pageMeta.ts. Needed because this is an
 * SPA — navigating via <Link> never triggers a fresh server request, so
 * without this the browser tab keeps whatever title the previous page set.
 */
export function usePageMeta(meta: PageMeta | undefined) {
  useEffect(() => {
    if (!meta) return;
    document.title = meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }
  }, [meta?.title, meta?.description]);
}
