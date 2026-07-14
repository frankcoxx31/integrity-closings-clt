/**
 * Per-route <title>/<meta description>/<link canonical> overrides, applied
 * on top of index.html's default tags. Shared by server.ts (runtime meta
 * injection) and scripts/prerender.tsx (build-time static HTML generation)
 * so the two never drift apart.
 */

import { businessConfig } from '../config/business';

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

export const pageMeta: Record<string, PageMeta> = {
  '/nursing-home-notary-charlotte-nc': {
    title: `Nursing Home Notary Charlotte NC | Mobile Notary`,
    description: `Need a notary at a nursing home or assisted living facility in Charlotte, NC? ${businessConfig.name} sends a commissioned notary directly to residents in Mecklenburg, Union, and Cabarrus counties.`,
    canonical: `${businessConfig.domain}/nursing-home-notary-charlotte-nc`,
  },
  '/hospital-notary-charlotte-nc': {
    title: `Hospital & Bedside Notary Charlotte NC | Mobile Notary`,
    description: 'Need a notary at a hospital in Charlotte, NC? We provide mobile bedside notary services for patients and families at Atrium, Novant, and care facilities.',
    canonical: `${businessConfig.domain}/hospital-notary-charlotte-nc`,
  },
  '/mobile-notary-charlotte-nc': {
    title: `Mobile Notary Services in Charlotte, NC | ${businessConfig.name}`,
    description: `${businessConfig.name} provides professional mobile notary services throughout Charlotte, NC. We come to your home, office, hospital, or care facility — same-day appointments available.`,
    canonical: `${businessConfig.domain}/mobile-notary-charlotte-nc`,
  },
  '/estate-notary-charlotte-nc': {
    title: `Estate & Trust Notarization Charlotte NC | Mobile Notary`,
    description: 'Professional mobile notary for estate planning and trust documents in Charlotte, NC. We travel to homes, hospitals, and nursing homes for Wills, Trusts, and POA.',
    canonical: `${businessConfig.domain}/estate-notary-charlotte-nc`,
  },
  '/after-hours-mobile-notary-charlotte-nc': {
    title: `After-Hours Mobile Notary Charlotte NC | Evening & Weekend Notary | ${businessConfig.name}`,
    description: `Need a notary after hours in Charlotte, NC? ${businessConfig.name} offers evening and weekend mobile notary appointments — available when banks and UPS stores are closed.`,
    canonical: `${businessConfig.domain}/after-hours-mobile-notary-charlotte-nc`,
  },
  '/loan-signing-agent-charlotte-nc': {
    title: `Loan Signing Agent Charlotte NC | Certified Mobile Notary | ${businessConfig.name}`,
    description: 'Certified loan signing agent serving Charlotte, NC and surrounding areas. Professional, accurate, and reliable closings at your home, office, or any location.',
    canonical: `${businessConfig.domain}/loan-signing-agent-charlotte-nc`,
  },
  '/general-notary-charlotte-nc': {
    title: `General Mobile Notary Charlotte NC | We Come To You`,
    description: 'General mobile notary services in Charlotte, NC. Skip the line and hassle, we travel to you for affidavits, auto titles, I-9s, and general documents.',
    canonical: `${businessConfig.domain}/general-notary-charlotte-nc`,
  },
  '/power-of-attorney-estate-documents-charlotte-nc': {
    title: `Power of Attorney & Estate Notary Charlotte NC | Mobile Notary`,
    description: 'Professional mobile notary for Power of Attorney, Wills, and Trust documents in Charlotte, NC. Home, hospital, and nursing home visits available.',
    canonical: `${businessConfig.domain}/power-of-attorney-estate-documents-charlotte-nc`,
  },
  '/services/lender-provided-documents': {
    title: `Lender Provided Documents Notary Charlotte NC | ${businessConfig.name}`,
    description: 'Mobile notary and loan signing agent for lender-provided document packages in Charlotte, NC — refinances, buyer/seller packages, HELOCs, and loan modifications.',
    canonical: `${businessConfig.domain}/services/lender-provided-documents`,
  },
  '/services/seller-documents': {
    title: `Seller Closing Documents Notary Charlotte NC | ${businessConfig.name}`,
    description: 'Mobile notary for home sellers in Charlotte, NC — deeds, settlement statements, affidavits of title, and other seller closing package documents.',
    canonical: `${businessConfig.domain}/services/seller-documents`,
  },
  '/areas-served': {
    title: `Mobile Notary Service Areas | Charlotte NC & Surrounding Counties | ${businessConfig.name}`,
    description: `${businessConfig.name} provides mobile notary services across Mecklenburg, Union, and Cabarrus counties including Mint Hill, Matthews, Huntersville, Monroe, and more.`,
    canonical: `${businessConfig.domain}/areas-served`,
  },
};
