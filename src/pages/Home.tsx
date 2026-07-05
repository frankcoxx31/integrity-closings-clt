import { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import MeetNotary from '../components/MeetNotary';
import Locations from '../components/Locations';
import Reviews from '../components/Reviews';
import { businessConfig } from '../config/business';

export default function Home() {
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": businessConfig.name,
      "url": businessConfig.domain,
      "telephone": `+1-${businessConfig.phone.display}`,
      "description": "Mobile notary public and loan signing agent serving Charlotte, Mint Hill, Matthews, and surrounding Mecklenburg County. Specializing in estate notarization, hospital bedside signings, elder care facilities, and general mobile notary services.",
      "areaServed": [
        "Mint Hill NC", "Charlotte NC", "Matthews NC", "Stallings NC",
        "Indian Trail NC", "Monroe NC", "Harrisburg NC", "Mecklenburg County NC",
        "Union County NC"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": businessConfig.address.locality,
        "addressRegion": businessConfig.address.region,
        "postalCode": businessConfig.address.postalCode,
        "addressCountry": businessConfig.address.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": businessConfig.officeLocation.lat,
        "longitude": businessConfig.officeLocation.lng
      },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "07:00",
        "closes": "21:00"
      }],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Notary Services",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Loan Signing Agent"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Estate and Trust Notarization"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Hospital and Bedside Notary"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Nursing Home and Assisted Living Notary"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "General Mobile Notary"}}
        ]
      },
      "sameAs": [
        "https://www.google.com/maps?cid=YOUR_GOOGLE_CID",
        "https://www.yelp.com/biz/integrity-closings-clt",
        "https://www.notarycafe.com/profile/YOUR_PROFILE",
        "https://www.nationalnotary.org/verify/YOUR_PROFILE"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'home-jsonld-schema';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('home-jsonld-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <MeetNotary />
      <Locations />
      <Reviews />
    </>
  );
}
