import { CheckCircle, ArrowRight, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function MobileNotaryServices() {
  useEffect(() => {
    // Title
    document.title = 'Mobile Notary Charlotte NC | Integrity Closings CLT';

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Need a mobile notary in Charlotte, NC? Book same-day or after-hours service for POA, estate docs, hospital visits & more. Call 980-505-8050 now.');

    // Canonical — fix the critical canonical bug (was pointing to homepage)
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.integrityclosingsclt.com/mobile-notary-charlotte-nc';

    // Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'mobile-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["LegalService", "LocalBusiness"],
          "@id": "https://www.integrityclosingsclt.com/#business",
          "name": "Integrity Closings CLT",
          "url": "https://www.integrityclosingsclt.com/",
          "telephone": "(980) 505-8050",
          "email": "fcoxx@integrityclosingsclt.com",
          "image": "https://www.integrityclosingsclt.com/logo.jpg",
          "description": "Professional mobile notary services in Charlotte, NC — same-day, after-hours, hospital bedside, and estate document notarizations throughout Mecklenburg and Union counties.",
          "priceRange": "$$",
          "openingHours": "Mo-Su 08:00-21:00",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "3",
            "bestRating": "5",
            "worstRating": "1"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Charlotte",
            "addressRegion": "NC",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.2271,
            "longitude": -80.8431
          },
          "areaServed": [
            { "@type": "City", "name": "Charlotte" },
            { "@type": "City", "name": "Mint Hill" },
            { "@type": "City", "name": "Matthews" },
            { "@type": "City", "name": "Monroe" },
            { "@type": "City", "name": "Indian Trail" },
            { "@type": "City", "name": "Waxhaw" },
            { "@type": "City", "name": "Pineville" },
            { "@type": "City", "name": "Concord" },
            { "@type": "City", "name": "Huntersville" }
          ]
        },
        {
          "@type": "Service",
          "name": "Mobile Notary Services in Charlotte, NC",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": { "@type": "City", "name": "Charlotte" },
          "serviceType": "Mobile Notary Services",
          "description": "Professional mobile notary services in Charlotte, NC for affidavits, powers of attorney, estate planning documents, medical forms, hospital bedside signings, and more.",
          "url": "https://www.integrityclosingsclt.com/mobile-notary-charlotte-nc"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.integrityclosingsclt.com/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.integrityclosingsclt.com/mobile-notary-charlotte-nc" },
            { "@type": "ListItem", "position": 3, "name": "Mobile Notary Charlotte NC", "item": "https://www.integrityclosingsclt.com/mobile-notary-charlotte-nc" }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a mobile notary?",
              "acceptedAnswer": { "@type": "Answer", "text": "A mobile notary is a commissioned Notary Public who travels to your specific location—whether that's your home, office, hospital room, or local coffee shop—to perform notarial acts, rather than you having to visit a storefront." }
            },
            {
              "@type": "Question",
              "name": "How much does a mobile notary cost in North Carolina?",
              "acceptedAnswer": { "@type": "Answer", "text": "The State of North Carolina regulates the notarial fee at a maximum of $10 per principal signature. In addition to this state-mandated fee, mobile notaries charge a separate travel fee which varies based on distance." }
            },
            {
              "@type": "Question",
              "name": "Do you provide witnesses for document signings?",
              "acceptedAnswer": { "@type": "Answer", "text": "If your documents require additional witnesses beyond the notary, we can often provide them given enough advance notice. An additional fee applies per witness provided." }
            },
            {
              "@type": "Question",
              "name": "How far do you travel in the Charlotte area?",
              "acceptedAnswer": { "@type": "Answer", "text": "We travel extensively throughout Mecklenburg County, Union County, and parts of Cabarrus County. This includes Charlotte, Mint Hill, Matthews, Pineville, Concord, Monroe, and Indian Trail." }
            },
            {
              "@type": "Question",
              "name": "Can you print my documents before arriving?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer document printing services for an additional fee. You can simply email us your PDF documents beforehand, and we will bring the physical copies to your location." }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('mobile-notary-schema');
      if (existingScript) document.head.removeChild(existingScript);
      // Restore homepage canonical on unmount
      if (canonical) canonical.href = 'https://www.integrityclosingsclt.com/';
      document.title = 'Mobile Notary Charlotte NC | Loan Signing Agent | Integrity Closings CLT';
    };
  }, []);

  const serviceCategories = [
    {
      title: "Personal Documents",
      image: "/personal-documents.png",
      alt: "Mobile notary Charlotte NC — personal documents",
      link: "/estate-notary-charlotte-nc",
      items: ["Affidavits", "Power of Attorney", "Wills & Trusts", "Medical Directives", "Passport Applications"]
    },
    {
      title: "Business Documents",
      image: "/business-documents.png",
      alt: "Mobile notary Charlotte NC — business documents",
      link: "/services/business-documents",
      items: ["Contracts", "Corporate Resolutions", "Employment Verification", "Lease Agreements", "Partnership Agreements"]
    },
    {
      title: "Financial Documents",
      image: "/financial-documents.png",
      alt: "Mobile notary Charlotte NC — financial documents",
      link: "/services/financial-documents",
      items: ["Loan Modifications", "Refinances", "HELOCs", "Reverse Mortgages", "Promissory Notes"]
    },
    {
      title: "Legal Documents",
      image: "/legal-documents.png",
      alt: "Mobile notary Charlotte NC — legal documents",
      link: "/services/legal-documents",
      items: ["Court Documents", "Divorce Decrees", "Adoption Papers", "Settlement Agreements", "Guardianship Papers"]
    },
    {
      title: "Real Estate Documents",
      image: "/real-estate-documents.png",
      alt: "Mobile notary Charlotte NC — real estate documents",
      link: "/services/real-estate-documents",
      items: ["Deeds", "Closing Disclosures", "Title Documents", "Property Transfers", "Easements"]
    },
    {
      title: "Special Considerations",
      image: "/special-considerations.png",
      alt: "Mobile notary Charlotte NC — special considerations",
      link: "/services/special-considerations",
      items: ["Jail/Detention Center Visits", "After-Hours/Emergency Signings", "Workplace/Office Visits", "Public Location Meetups"]
    },
    {
      title: "Miscellaneous Documents",
      image: "/miscellaneous-documents.png",
      alt: "Mobile notary Charlotte NC — miscellaneous documents",
      link: "/services/miscellaneous-documents",
      items: ["Vehicle Title Transfers", "School Forms", "Travel Consents", "I-9 Verification", "Copy Certifications"]
    },
    {
      title: "Hospitals & Nursing Homes",
      image: "/hospital-and-nursing-home-notarizations-pua.jpg",
      alt: "Hospital and nursing home bedside notary Charlotte NC",
      link: "/hospital-notary-charlotte-nc",
      items: ["Medical Power of Attorney", "Living Wills", "Advance Directives", "HIPAA Authorizations", "Healthcare Proxies"]
    },
    {
      title: "Lender Provided Documents",
      image: "/lender-provided-documents.png",
      alt: "Loan signing agent Charlotte NC — lender provided documents",
      link: "/loan-signing-agent-charlotte-nc",
      items: ["Refinance Packages", "Buyer/Seller Packages", "Loan Modifications", "HELOCs", "Reverse Mortgages"]
    }
  ];

  const testimonials = [
    {
      name: "Sandra M.",
      location: "SouthPark, Charlotte",
      text: "Frank came to my mother's nursing home in Matthews on a Saturday afternoon to notarize her power of attorney. He was professional, calm, and made a stressful situation much easier. Highly recommend.",
      service: "Hospital / Nursing Home",
      stars: 5
    },
    {
      name: "James T.",
      location: "Mint Hill, NC",
      text: "Needed a deed notarized same-day and Frank was at my home within two hours. Fast, professional, and very reasonably priced. Will definitely use again for any future signings.",
      service: "Real Estate Documents",
      stars: 5
    },
    {
      name: "Patricia W.",
      location: "Monroe, NC",
      text: "We called Frank when my father was hospitalized at Atrium Health and needed his advance directive notarized urgently. He arrived within the hour and handled everything perfectly. Cannot thank him enough.",
      service: "Advance Directive / Healthcare POA",
      stars: 5
    }
  ];

  const neighborhoods = [
    "Uptown Charlotte", "SouthPark", "Ballantyne", "South End", "Plaza Midwood",
    "Mint Hill", "Matthews", "Monroe", "Indian Trail", "Waxhaw",
    "Pineville", "Concord", "Huntersville", "Weddington", "Stallings"
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-brand-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/mobile-notary-charlotte-nc" className="hover:text-brand-600 text-slate-700 font-medium">Mobile Notary Charlotte NC</Link></li>
          </ol>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Mobile Notary Services in Charlotte, NC</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Integrity Closings CLT comes to you — at your home, office, hospital, or care facility — for same-day and after-hours notarizations throughout Charlotte and surrounding areas.
          </p>
        </div>

        {/* Main intro + CTA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Same-Day Mobile Notary In The Charlotte Area</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Charlotte residents, business owners, and families throughout Mecklenburg and Union counties count on Integrity Closings CLT when documents need to be notarized fast — and they can't get to an office. Whether you're in SouthPark, Ballantyne, Mint Hill, or Monroe, we come to you within hours.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                We specialize in situations where time matters most: a family member hospitalized at Atrium Health or Novant who needs a power of attorney signed, a real estate closing that needs a notary at the property, or an after-hours signing when every other option is closed.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Simply call or text 980-505-8050, tell us what you need and where you are, and we'll confirm availability and arrive — often the same day.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/booking" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors">Book Now</Link>
                <a href="tel:9805058050" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                  Call 980-505-8050
                </a>
              </div>
            </div>
            <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
              <h3 className="text-lg font-bold text-brand-900 mb-3">Why Charlotte Residents Choose Integrity Closings CLT</h3>
              <ul className="space-y-3">
                {[
                  "We come to your home, office, or hospital room",
                  "Same-day and after-hours appointments available",
                  "NC commissioned notary public — Frank L. Coxx",
                  "Hospital bedside notarizations throughout Charlotte",
                  "Serving Mecklenburg, Union & Cabarrus counties",
                  "Responsive — call or text, we answer quickly"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Who needs a mobile notary in Charlotte */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Needs a Mobile Notary in Charlotte, NC?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-slate-600 leading-relaxed">
            <div>
              <p className="mb-4">
                <strong className="text-slate-800">Families with aging or ill relatives</strong> are the most common clients we serve in Charlotte. When a parent or spouse is in the hospital or a nursing home and decisions need to be made, a power of attorney or advance directive must be signed and notarized before it's too late. We go directly to Atrium Health, Novant Health, and care facilities throughout Mecklenburg County.
              </p>
              <p className="mb-4">
                <strong className="text-slate-800">Homebound and elderly residents</strong> throughout Charlotte's neighborhoods — from Ballantyne to Huntersville — often need estate documents notarized but can no longer drive. We make house calls throughout the metro area, including Indian Trail, Waxhaw, and Monroe in Union County.
              </p>
            </div>
            <div>
              <p className="mb-4">
                <strong className="text-slate-800">Real estate transactions</strong> frequently require a notary at the property, a title company, or an attorney's office. We work with Charlotte-area buyers, sellers, and attorneys on deed transfers, quitclaim deeds, and closing packages — including same-day service for time-sensitive closings.
              </p>
              <p className="mb-4">
                <strong className="text-slate-800">Business owners and professionals</strong> across Charlotte use our services for contracts, corporate resolutions, and employment documents — especially when multiple parties need to sign and a convenient central location doesn't exist.
              </p>
            </div>
          </div>
        </div>

        {/* Service categories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceCategories.map((category, index) => (
            <Link to={category.link} key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow flex flex-col group">
              <div className="mb-5 w-full h-48 rounded-xl overflow-hidden bg-slate-100">
                <img src={category.image} alt={category.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">{category.title}</h3>
              <ul className="space-y-2 mb-6 flex-grow">
                {category.items.map((item, idx) => (
                  <li key={idx} className="text-slate-600 text-sm flex items-start">
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-brand-600 font-medium">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">What Charlotte Clients Say</h2>
          <p className="text-slate-500 mb-8 text-sm">Reviews from Google — Charlotte, NC area</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-xl border border-slate-100 p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{t.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-brand-600 font-medium">{t.service}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="https://g.page/r/integrityclosingsclt/review" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline text-sm font-medium">Leave us a Google review →</a>
          </div>
        </div>

        {/* Service area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Charlotte Neighborhoods & Surrounding Areas We Serve</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Integrity Closings CLT serves all of Charlotte and the surrounding communities in Mecklenburg, Union, and Cabarrus counties. Whether you're in Uptown, need a notary in Ballantyne, or are looking for a mobile notary in Monroe or Waxhaw, we come to you.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {neighborhoods.map((n, i) => (
              <span key={i} className="bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium px-3 py-1 rounded-full">{n}</span>
            ))}
          </div>
          {/* Google Map */}
          <div className="rounded-xl overflow-hidden border border-slate-200 h-64">
            <iframe
              title="Integrity Closings CLT service area — Charlotte, NC mobile notary"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208647.94848073677!2d-81.03645!3d35.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541fc4fc381a81%3A0xad3f30f5e922ae19!2sCharlotte%2C%20NC!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions — Mobile Notary Charlotte NC</h2>
          <div className="space-y-6">
            {[
              {
                q: "What is a mobile notary?",
                a: "A mobile notary is a commissioned Notary Public who travels to your specific location — whether that's your home, office, hospital room, or local coffee shop — to perform notarial acts, rather than you having to visit a storefront."
              },
              {
                q: "How much does a mobile notary cost in North Carolina?",
                a: "The State of North Carolina regulates the notarial fee at a maximum of $10 per principal signature. In addition to this state-mandated fee, mobile notaries charge a separate travel fee which varies based on distance."
              },
              {
                q: "Do you provide witnesses for document signings?",
                a: "If your documents require additional witnesses beyond the notary, we can often provide them given enough advance notice. An additional fee applies per witness provided."
              },
              {
                q: "How far do you travel in the Charlotte area?",
                a: "We travel extensively throughout Mecklenburg County, Union County, and parts of Cabarrus County. This includes Charlotte, Mint Hill, Matthews, Pineville, Concord, Monroe, and Indian Trail."
              },
              {
                q: "Can you print my documents before arriving?",
                a: "Yes, we offer document printing services for an additional fee. You can simply email us your PDF documents beforehand, and we will bring the physical copies to your location."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need a Mobile Notary in Charlotte Today?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Call or text 980-505-8050 for same-day service, or book online. We serve Charlotte and all surrounding communities in Mecklenburg and Union counties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-slate-900 bg-white hover:bg-slate-100 transition-colors">Book Appointment</Link>
            <a href="tel:9805058050" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white border-2 border-white hover:bg-white hover:text-slate-900 transition-colors">Call 980-505-8050</a>
          </div>
        </div>

      </div>
    </div>
  );
}
