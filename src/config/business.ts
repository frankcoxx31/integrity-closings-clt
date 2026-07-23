/**
 * Single source of truth for this business's identity, pricing, and content
 * defaults. To set this site up for a new customer, edit this file first,
 * then follow TEMPLATE_SETUP.md for the remaining manual steps (index.html
 * meta/analytics, server.ts pageMeta, and city-page copy can't be sourced
 * from here — see that doc for why).
 */

export const businessConfig = {
  name: 'Integrity Closings CLT',
  ownerName: 'Frank Coxx',
  // Single number for both calls and texts.
  phone: {
    display: '980-505-8050',
    tel: '9805058050',
  },
  email: 'fcoxx@integrityclosingsclt.com',
  contactEmail: 'info@integrityclosingsclt.com',
  domain: 'https://www.integrityclosingsclt.com',

  // The primary city baked into route slugs, taglines, and the city-page grid
  // today (e.g. /hospital-notary-charlotte-nc). This is a marketing/SEO hub
  // city, not necessarily the notary's actual physical address (see
  // `address`/`officeLocation` below). Renaming this to move to a new
  // customer's city is handled by scripts/rebrand.mjs.
  hubCity: 'Charlotte',
  hubState: 'NC',
  // Default schema.org geoMidpoint for city pages that don't specify their
  // own coordinates (each city page should pass its own `geo` prop to
  // CityPageLayout for accuracy — this is just the fallback).
  hubGeo: {
    lat: 35.2271,
    lng: -80.8431,
    radiusMeters: 50000,
  },

  // The notary's actual physical location — used for the real LocalBusiness
  // address/geo on the homepage and as the mileage-calculator's origin point.
  address: {
    locality: 'Mint Hill',
    region: 'NC',
    postalCode: '28227',
    country: 'US',
  },
  officeLocation: {
    lat: 35.1813,
    lng: -80.6556,
  },
  serviceAreaLabel: 'Serving the Greater Metro Area',

  hours: {
    weekday: 'Monday - Saturday: 9:00am - 7:00pm',
    weekend: 'Sunday: Closed',
    afterHours: 'After-hours service available (7:00pm - 11:00pm)',
    // Hospital, hospice, and nursing home / assisted living signings are handled
    // around the clock, since bedside documents are often time-critical.
    facilityLabel: 'Hospital & nursing home visits: 24/7 emergency availability',
  },

  pricing: {
    notaryFeePerSignature: 10,
    irsMileageRate: 0.725,
  },

  // These IDs are literally different Google accounts per customer. They're
  // documented here for reference, but index.html (static) and server.ts's
  // pageMeta still need a manual edit — see TEMPLATE_SETUP.md.
  analytics: {
    gtmId: 'GTM-WS4HGC6H',
    gaId: 'G-RBR8WJGG39',
    googleAdsId: 'AW-17355177903',
  },
};

export type BusinessConfig = typeof businessConfig;
