import { ArrowLeft, CheckCircle, Info, MapPin, Phone, Heart, Clock, ShieldCheck, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const nursingHomeNotarySchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Nursing Home & Assisted Living Notary",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "telephone": "(980) 505-8050",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": [
            { "@type": "City", "name": "Charlotte" },
            { "@type": "City", "name": "Matthews" },
            { "@type": "City", "name": "Monroe" },
            { "@type": "City", "name": "Concord" },
            { "@type": "City", "name": "Mint Hill" }
          ],
          "description": "Mobile notary services for residents at nursing homes, assisted living facilities, and memory care units in Charlotte, NC and surrounding areas.",
          "url": "https://www.integrityclosingsclt.com/nursing-home-notary-charlotte-nc"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.integrityclosingsclt.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://www.integrityclosingsclt.com/mobile-notary-charlotte-nc"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Nursing Home Notary",
              "item": "https://www.integrityclosingsclt.com/nursing-home-notary-charlotte-nc"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can a notary visit me in a nursing home in Charlotte?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We provide mobile notary services directly to nursing home and assisted living residents throughout Charlotte, NC and surrounding areas including Matthews, Monroe, Mint Hill, and Concord. We coordinate with facility staff and come to the resident's room."
              }
            },
            {
              "@type": "Question",
              "name": "What documents can be notarized at a nursing home?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Common documents notarized at nursing homes include Power of Attorney (Durable and Healthcare), Living Wills, Advance Directives, Medicaid spend-down paperwork, financial account authorizations, affidavits, and trust documents. The resident must have mental capacity to sign."
              }
            },
            {
              "@type": "Question",
              "name": "Does the nursing home resident need to have mental capacity?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. North Carolina law requires the notary to confirm the signer understands what they are signing and is acting voluntarily. If a resident has dementia or another condition affecting cognition, we may not be able to proceed. We recommend consulting with the attending physician before scheduling."
              }
            },
            {
              "@type": "Question",
              "name": "How do I schedule a notary to come to an assisted living facility?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Call or text (980) 505-8050. Tell us the facility name, the resident's room, what documents need to be notarized, and whether two qualified witnesses will be present. We coordinate directly with the facility's front desk or charge nurse before arriving."
              }
            },
            {
              "@type": "Question",
              "name": "Do we need witnesses for a Power of Attorney at a nursing home?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. North Carolina requires two qualified witnesses for a Power of Attorney in addition to the notary. Witnesses cannot be the named agent, a relative of the signer, or anyone who stands to inherit from the signer. Nursing home staff are often prohibited by facility policy from serving as witnesses. We can sometimes arrange witnesses for an additional fee."
              }
            }
          ]
        }
      ]
};

export default function NursingHomeNotary() {
  useEffect(() => {
    document.title = "Nursing Home Notary Charlotte NC | Mobile Notary";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Need a notary at a nursing home or assisted living facility in Charlotte, NC? Integrity Closings CLT provides mobile notary services for residents at care facilities across Mecklenburg, Union, and Cabarrus counties.");
    }

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = 'https://www.integrityclosingsclt.com/nursing-home-notary-charlotte-nc';
    }
  }, []);

  const commonDocuments = [
    "Durable Power of Attorney",
    "Healthcare Power of Attorney",
    "Living Will / Advance Directive",
    "Medicaid Paperwork",
    "Financial Account Authorizations",
    "Trust Documents",
    "Affidavits",
    "HIPAA Authorizations"
  ];

  const facilities = [
    "Nursing homes and skilled nursing facilities",
    "Assisted living communities",
    "Memory care units",
    "Rehabilitation centers",
    "Continuing care retirement communities (CCRCs)",
    "Adult care homes"
  ];

  const faqs = [
    {
      q: "Can a notary visit me in a nursing home in Charlotte?",
      a: "Yes. We provide mobile notary services directly to nursing home and assisted living residents throughout Charlotte, NC and surrounding areas including Matthews, Monroe, Mint Hill, and Concord. We coordinate with facility staff and come to the resident's room."
    },
    {
      q: "What documents can be notarized at a nursing home?",
      a: "Common documents notarized at nursing homes include Power of Attorney (Durable and Healthcare), Living Wills, Advance Directives, Medicaid spend-down paperwork, financial account authorizations, affidavits, and trust documents. The resident must have mental capacity to sign."
    },
    {
      q: "Does the nursing home resident need to have mental capacity?",
      a: "Yes. North Carolina law requires the notary to confirm the signer understands what they are signing and is acting voluntarily. If a resident has dementia or another condition affecting cognition, we may not be able to proceed. We recommend consulting with the attending physician before scheduling."
    },
    {
      q: "How do I schedule a notary to come to an assisted living facility?",
      a: "Call or text (980) 505-8050. Tell us the facility name, the resident's room, what documents need to be notarized, and whether two qualified witnesses will be present. We coordinate directly with the facility's front desk or charge nurse before arriving."
    },
    {
      q: "Do we need witnesses for a Power of Attorney at a nursing home?",
      a: "Yes. North Carolina requires two qualified witnesses for a Power of Attorney in addition to the notary. Witnesses cannot be the named agent, a relative of the signer, or anyone who stands to inherit from the signer. Nursing home staff are often prohibited by facility policy from serving as witnesses. We can sometimes arrange witnesses for an additional fee."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nursingHomeNotarySchema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/mobile-notary-charlotte-nc" className="inline-flex items-center text-brand-600 hover:text-brand-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Services
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200"
              alt="Nursing Home Notary Services in Charlotte NC"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-8 sm:p-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-slate-500 mb-6 font-sans">
              <Link to="/" className="hover:text-brand-600">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/mobile-notary-charlotte-nc" className="hover:text-brand-600">Services</Link>
              <span className="mx-2">›</span>
              <span className="text-slate-700">Nursing Home Notary</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Nursing Home Notary Services in Charlotte, NC
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              When a loved one lives in a nursing home or assisted living facility, getting legal documents notarized shouldn't require anyone to travel. Integrity Closings CLT sends a commissioned NC notary directly to the resident's room — at facilities throughout Charlotte, Matthews, Monroe, Mint Hill, and Concord.
            </p>

            <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:9805058050"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (980) 505-8050
              </a>
              <a
                href="sms:9805058050"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-200"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Text (980) 505-8050
              </a>
            </div>
            <p className="text-center text-slate-500 -mt-6 mb-10 text-sm">To schedule a nursing home or assisted living notary visit</p>

            {/* How it works */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-brand-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">How Our Nursing Home Notary Service Works</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                {[
                  { step: "1", title: "Call or text us", desc: "Tell us the facility, the resident's room, and what needs to be notarized." },
                  { step: "2", title: "We coordinate", desc: "We contact the facility's front desk or charge nurse to confirm visitor access before arriving." },
                  { step: "3", title: "We come to them", desc: "We arrive at the resident's room, verify identity, and complete the notarization on site." }
                ].map((item) => (
                  <div key={item.step} className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-center">
                    <div className="w-10 h-10 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">{item.step}</div>
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Documents */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-6 h-6 text-brand-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Documents We Commonly Notarize at Nursing Homes</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-sm mt-4">
                Need something not on this list? <a href="tel:9805058050" className="text-brand-600 hover:underline">Call us</a> — if it can be notarized in NC, we can handle it.
              </p>
            </section>

            {/* Credentials */}
            <section className="mb-12 p-6 bg-brand-50 rounded-xl border border-brand-100">
              <div className="flex items-center mb-4">
                <ShieldCheck className="w-6 h-6 text-brand-600 mr-3" />
                <h2 className="text-xl font-bold text-slate-900">Credentials Families Can Verify</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Commissioned Notary Public, State of North Carolina",
                  "National Notary Association (NNA) Certified",
                  "Background-screened",
                  "$100,000 Errors & Omissions (E&O) insured"
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-sm mt-4">
                Your NC notary commission can be verified directly through the North Carolina Secretary of State's website.
              </p>
            </section>

            {/* Facility types */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-brand-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Facilities We Visit</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facilities.map((f, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-brand-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Important notice */}
            <section className="mb-12 p-6 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Before You Schedule — Important Requirements</h2>
                  <ul className="space-y-3">
                    {[
                      "The resident must have mental capacity — they must understand what they are signing and be acting voluntarily.",
                      "A valid government-issued photo ID is required (driver's license, state ID, or passport).",
                      "Power of Attorney documents require two qualified witnesses in addition to the notary.",
                      "Documents should be printed and unsigned before we arrive — do not have the resident sign early.",
                      "If dementia or cognitive impairment is a concern, consult the attending physician before scheduling."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-3 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Areas */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-brand-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Areas We Serve</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We serve nursing homes, assisted living facilities, and memory care communities throughout Charlotte, Matthews, Monroe, Mint Hill, Pineville, Concord, Harrisburg, Indian Trail, Waxhaw, and surrounding areas in Mecklenburg, Union, and Cabarrus counties.
              </p>
            </section>

            {/* Why us */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <ShieldCheck className="w-6 h-6 text-brand-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Why Families Choose Integrity Closings CLT</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Experienced with facility coordination and visitor protocols",
                  "Patient, respectful, and calm — we understand these situations are sensitive",
                  "Same-day and after-hours appointments available",
                  "Commissioned NC Notary Public — credentials verifiable through NC Secretary of State",
                  "Serving Charlotte area facilities for Power of Attorney, Living Wills, and more",
                  "We can sometimes arrange qualified witnesses if your family cannot provide them"
                ].map((reason, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{reason}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Related links */}
            <section className="mb-12 p-6 bg-brand-50 rounded-xl border border-brand-100">
              <h3 className="font-bold text-slate-900 mb-3">Related Services</h3>
              <div className="flex flex-wrap gap-3">
                <Link to="/hospital-notary-charlotte-nc" className="text-brand-600 hover:underline text-sm">Hospital & Bedside Notary</Link>
                <span className="text-slate-300">|</span>
                <Link to="/estate-notary-charlotte-nc" className="text-brand-600 hover:underline text-sm">Estate Planning Notary</Link>
                <span className="text-slate-300">|</span>
                <Link to="/blog/power-of-attorney-north-carolina-notarized" className="text-brand-600 hover:underline text-sm">Power of Attorney Guide</Link>
                <span className="text-slate-300">|</span>
                <Link to="/after-hours-mobile-notary-charlotte-nc" className="text-brand-600 hover:underline text-sm">After-Hours Notary</Link>
              </div>
            </section>

            {/* CTA */}
            <div className="text-center pt-10 border-t border-slate-100">
              <p className="text-xl font-bold text-slate-900 mb-2">Need a Notary at a Nursing Home or Assisted Living Facility?</p>
              <p className="text-slate-500 mb-6">We coordinate with the facility and come directly to the resident. Same-day appointments often available.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:9805058050"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (980) 505-8050
                </a>
                <a
                  href="sms:9805058050"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-200"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Text (980) 505-8050
                </a>
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-200"
                >
                  Book Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
