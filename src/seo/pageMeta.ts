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
    description: `Need a notary at a nursing home or assisted living facility in Charlotte, NC? We send a commissioned notary directly to residents.`,
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
  '/blog': {
    title: `Notary Blog | Insights & Expert Advice | ${businessConfig.name}`,
    description: `Articles and guides on mobile notary services, loan signings, estate documents, and NC notary rules from ${businessConfig.name}, serving Charlotte and the surrounding area.`,
    canonical: `${businessConfig.domain}/blog`,
  },
  '/areas-served': {
    title: `Mobile Notary Service Areas | Charlotte NC & Surrounding Counties | ${businessConfig.name}`,
    description: `${businessConfig.name} provides mobile notary services across Mecklenburg, Union, and Cabarrus counties including Mint Hill, Matthews, Huntersville, Monroe, and more.`,
    canonical: `${businessConfig.domain}/areas-served`,
  },
  '/about': {
    title: `About Frank Coxx | ${businessConfig.name}`,
    description: `Meet Frank Coxx, owner of ${businessConfig.name} — a mobile notary and certified loan signing agent serving Charlotte, NC and the surrounding area.`,
    canonical: `${businessConfig.domain}/about`,
  },
  '/contact': {
    title: `Contact Us | ${businessConfig.name}`,
    description: `Contact ${businessConfig.name} to book a mobile notary or loan signing appointment in Charlotte, NC. Call, text, or fill out our online form.`,
    canonical: `${businessConfig.domain}/contact`,
  },
  '/faq': {
    title: `Frequently Asked Questions | ${businessConfig.name}`,
    description: 'Answers to common questions about mobile notary and loan signing services in Charlotte, NC — fees, ID requirements, scheduling, and more.',
    canonical: `${businessConfig.domain}/faq`,
  },
  '/resources': {
    title: `Notary Resources & Insights | ${businessConfig.name}`,
    description: 'Helpful guides on notarization in North Carolina — acceptable ID, acknowledgments vs. jurats, what a mobile notary does, and more.',
    canonical: `${businessConfig.domain}/resources`,
  },
  '/resources/acknowledgment-vs-jurat': {
    title: `Acknowledgment vs. Jurat: What's the Difference? | ${businessConfig.name}`,
    description: "Learn the difference between an acknowledgment and a jurat notarization, and which one your legal document requires in North Carolina.",
    canonical: `${businessConfig.domain}/resources/acknowledgment-vs-jurat`,
  },
  '/resources/acceptable-id-nc': {
    title: `Acceptable ID for NC Notarization | ${businessConfig.name}`,
    description: 'A guide to the government-issued ID accepted for notary appointments in North Carolina, so your signing goes smoothly the first time.',
    canonical: `${businessConfig.domain}/resources/acceptable-id-nc`,
  },
  '/resources/what-is-mobile-notary': {
    title: `What Is a Mobile Notary? | ${businessConfig.name}`,
    description: 'Learn what a mobile notary is, how it works, and how it saves you time compared to visiting a bank or notary office in Charlotte, NC.',
    canonical: `${businessConfig.domain}/resources/what-is-mobile-notary`,
  },
  '/resources/notary-toolkit': {
    title: `The Notary's Toolkit | ${businessConfig.name}`,
    description: "Frank Coxx's personally tested recommendations for notary supplies, stamps, journals, and tools to run a professional notary business.",
    canonical: `${businessConfig.domain}/resources/notary-toolkit`,
  },
  '/services/business-documents': {
    title: `Business Document Mobile Notary Charlotte NC | ${businessConfig.name}`,
    description: "Mobile notary services for business documents in Charlotte, NC — contracts, corporate resolutions, employment verification, and more.",
    canonical: `${businessConfig.domain}/services/business-documents`,
  },
  '/services/financial-documents': {
    title: `Financial Document Mobile Notary Charlotte NC | ${businessConfig.name}`,
    description: 'Mobile notary services for financial documents in Charlotte, NC — loan modifications, refinances, promissory notes, and more.',
    canonical: `${businessConfig.domain}/services/financial-documents`,
  },
  '/services/legal-documents': {
    title: `Legal Document Mobile Notary Charlotte NC | ${businessConfig.name}`,
    description: 'Mobile notary services for legal documents in Charlotte, NC — court documents, adoption papers, settlement agreements, and more.',
    canonical: `${businessConfig.domain}/services/legal-documents`,
  },
  '/services/real-estate-documents': {
    title: `Real Estate Document Notary Charlotte NC | ${businessConfig.name}`,
    description: 'Mobile notary for real estate documents in Charlotte, NC — deeds, closing disclosures, title documents, and property transfers.',
    canonical: `${businessConfig.domain}/services/real-estate-documents`,
  },
  '/services/special-considerations': {
    title: `After-Hours & Special Consideration Notary Charlotte NC | ${businessConfig.name}`,
    description: 'Flexible mobile notary services in Charlotte, NC for after-hours, special locations, and other unique notarization circumstances.',
    canonical: `${businessConfig.domain}/services/special-considerations`,
  },
  '/services/miscellaneous-documents': {
    title: `Miscellaneous Document Notary Charlotte NC | ${businessConfig.name}`,
    description: 'Mobile notary services for miscellaneous documents in Charlotte, NC — vehicle titles, school forms, travel consents, and more.',
    canonical: `${businessConfig.domain}/services/miscellaneous-documents`,
  },
  '/locations/charlotte': {
    title: `Mobile Notary Charlotte, NC | ${businessConfig.name}`,
    description: 'Professional mobile notary services in Charlotte, NC — same-day appointments, hospital & nursing home visits, and loan signings. We come to you.',
    canonical: `${businessConfig.domain}/locations/charlotte`,
  },
  '/locations/concord': {
    title: `Mobile Notary Concord, NC | ${businessConfig.name}`,
    description: 'Professional mobile notary services in Concord, NC — same-day appointments, hospital & nursing home visits, and loan signings. We come to you.',
    canonical: `${businessConfig.domain}/locations/concord`,
  },
  '/locations/gastonia': {
    title: `Mobile Notary Gastonia, NC | ${businessConfig.name}`,
    description: 'Professional mobile notary services in Gastonia, NC — same-day appointments, hospital & nursing home visits, and loan signings. We come to you.',
    canonical: `${businessConfig.domain}/locations/gastonia`,
  },
  '/locations/locust': {
    title: `Mobile Notary Locust, NC | ${businessConfig.name}`,
    description: 'Professional mobile notary services in Locust, NC — same-day appointments, hospital & nursing home visits, and loan signings. We come to you.',
    canonical: `${businessConfig.domain}/locations/locust`,
  },
  '/locations/matthews': {
    title: `Mobile Notary Matthews, NC | ${businessConfig.name}`,
    description: 'Professional mobile notary services in Matthews, NC — same-day appointments, hospital & nursing home visits, and loan signings. We come to you.',
    canonical: `${businessConfig.domain}/locations/matthews`,
  },
  '/locations/midland': {
    title: `Mobile Notary Midland, NC | ${businessConfig.name}`,
    description: 'Professional mobile notary services in Midland, NC — same-day appointments, hospital & nursing home visits, and loan signings. We come to you.',
    canonical: `${businessConfig.domain}/locations/midland`,
  },
  '/locations/monroe': {
    title: `Mobile Notary Monroe, NC | ${businessConfig.name}`,
    description: 'Professional mobile notary services in Monroe, NC — same-day appointments, hospital & nursing home visits, and loan signings. We come to you.',
    canonical: `${businessConfig.domain}/locations/monroe`,
  },
  '/locations/salisbury': {
    title: `Mobile Notary Salisbury, NC | ${businessConfig.name}`,
    description: 'Professional mobile notary services in Salisbury, NC — same-day appointments, hospital & nursing home visits, and loan signings. We come to you.',
    canonical: `${businessConfig.domain}/locations/salisbury`,
  },
  '/locations/mint-hill-loan-signing-agent': {
    title: `Mint Hill Loan Signing Agent | ${businessConfig.name}`,
    description: 'Mobile loan signing agent in Mint Hill, NC for refinance, purchase, seller, and HELOC documents. Serving Mint Hill and nearby East Charlotte areas.',
    canonical: `${businessConfig.domain}/locations/mint-hill-loan-signing-agent`,
  },
  '/locations/matthews-loan-signing-agent': {
    title: `Matthews Loan Signing Agent | ${businessConfig.name}`,
    description: 'Mobile loan signing agent in Matthews, NC for purchase, refinance, seller, and HELOC signings. Convenient appointments in Matthews and nearby areas.',
    canonical: `${businessConfig.domain}/locations/matthews-loan-signing-agent`,
  },
  '/locations/concord-loan-signing-agent': {
    title: `Concord Loan Signing Agent | ${businessConfig.name}`,
    description: 'Mobile loan signing agent in Concord, NC for refinance, purchase, seller, and mortgage document appointments throughout Concord and Cabarrus County.',
    canonical: `${businessConfig.domain}/locations/concord-loan-signing-agent`,
  },
  '/locations/cabarrus-county-loan-signing-agent': {
    title: `Cabarrus County Loan Signing Agent | ${businessConfig.name}`,
    description: 'Mobile loan signing services in Cabarrus County, NC for refinance, purchase, seller, and HELOC appointments in Concord, Kannapolis, and Harrisburg.',
    canonical: `${businessConfig.domain}/locations/cabarrus-county-loan-signing-agent`,
  },
  '/locations/union-county-loan-signing-agent': {
    title: `Union County Loan Signing Agent | ${businessConfig.name}`,
    description: 'Mobile loan signing agent in Union County, NC serving Monroe, Waxhaw, Indian Trail, and nearby communities for mortgage document appointments.',
    canonical: `${businessConfig.domain}/locations/union-county-loan-signing-agent`,
  },
  '/title-company-attorney-closing-support-charlotte-nc': {
    title: `Title Company & Attorney Closing Support | Charlotte, NC | ${businessConfig.name}`,
    description: 'Professional mobile closing support for title companies and real estate attorneys in Charlotte, NC. Reliable signer coordination and loan document execution.',
    canonical: `${businessConfig.domain}/title-company-attorney-closing-support-charlotte-nc`,
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${businessConfig.name}`,
    description: `Privacy policy for ${businessConfig.name}, a mobile notary and loan signing service serving Charlotte, NC and the surrounding area.`,
    canonical: `${businessConfig.domain}/privacy-policy`,
  },
  '/terms-of-service': {
    title: `Terms of Service | ${businessConfig.name}`,
    description: `Terms of service for ${businessConfig.name}'s mobile notary and loan signing services in Charlotte, NC.`,
    canonical: `${businessConfig.domain}/terms-of-service`,
  },
  '/disclaimer': {
    title: `Legal Disclaimer | ${businessConfig.name}`,
    description: 'Legal disclaimer for Integrity Closings CLT. A notary public is not an attorney and cannot give legal advice or draft legal documents.',
    canonical: `${businessConfig.domain}/disclaimer`,
  },
  '/service-agreement': {
    title: `Service Agreement & Fee Disclosure | ${businessConfig.name}`,
    description: `Notary fee schedule and service terms for ${businessConfig.name} in North Carolina, including travel reimbursement, cancellation, and payment responsibility.`,
    canonical: `${businessConfig.domain}/service-agreement`,
  },
};
