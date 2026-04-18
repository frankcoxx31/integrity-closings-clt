import { ArrowLeft, CheckCircle, MapPin, Phone, FileText, ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function EstateNotary() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Estate & Trust Notarization Charlotte NC | Mobile Notary";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Mobile notary for estate & trust documents in Charlotte, NC. We travel to you for powers of attorney, trusts, living wills, and advance directives.");
    }

    // JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'estate-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Estate & Trust Notarization",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Mobile notary for estate documents in Charlotte, NC, including powers of attorney, trusts, living wills, and advance directives.",
          "url": "https://www.integrityclosingsclt.com/estate-notary-charlotte-nc"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What documents do you notarize for estate attorneys?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We frequently notarize a wide variety of estate documents including Last Wills and Testaments, Revocable Living Trusts, Durable Powers of Attorney, Healthcare Powers of Attorney, Advance Directives, and Beneficiary Designations."
              }
            },
            {
              "@type": "Question",
              "name": "Can you provide witnesses for estate document signings?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we can arrange for impartial witnesses if requested in advance. However, an additional fee may apply per witness. In many cases, family members who are not named in the documents can also serve as witnesses, depending on the document requirements."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need to draft my own trust or will before you arrive?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. As Notaries Public, we are legally prohibited from drafting legal documents or providing legal advice. Your documents must be fully prepared by an estate attorney or drawn up yourself prior to our arrival."
              }
            },
            {
              "@type": "Question",
              "name": "Will you travel to an elder care facility or hospital for the notarization?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. We specialize in mobile services and frequently travel to hospitals, nursing homes, and assisted living facilities throughout the Charlotte area to notarize estate documents for patients and residents."
              }
            },
            {
              "@type": "Question",
              "name": "What happens if the signer has dementia or cognitive decline?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "By law, the notary must independently verify that the signer is aware of what they are signing and doing so willingly. If the signer cannot communicate effectively or does not understand the document due to cognitive decline or heavy medication, we cannot proceed with the notarization."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('estate-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const commonDocuments = [
    "Power of Attorney",
    "Durable Power of Attorney",
    "Healthcare Power of Attorney",
    "Living Wills",
    "Advance Directives",
    "Trust Documents",
    "Estate Planning Documents",
    "Affidavits",
    "Authorization Forms"
  ];

  const whyChooseUs = [
    "Mobile service at your location",
    "Professional, patient, and reliable",
    "Flexible scheduling available",
    "Serving Charlotte and surrounding areas",
    "Experienced with estate-related notarizations"
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/mobile-notary-charlotte-nc" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Services
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200" 
              alt="Estate Document Notary in Charlotte NC" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Estate & Trust Notarization
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Need a mobile notary for estate documents in Charlotte, NC? Integrity Closings CLT provides professional notarization for powers of attorney, trusts, living wills, advance directives, affidavits, and other estate-related documents. We travel to homes, hospitals, nursing homes, and care facilities throughout Charlotte and surrounding areas.
            </p>

            <div className="mb-10 text-center">
              <a 
                href="tel:9803724103" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call or text 980-372-4103 to schedule your appointment.
              </a>
            </div>
            
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Mobile Notary for Estate Documents</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We come directly to your location for convenient estate document notarization. Whether the signer is at home, in a hospital, or in a nursing facility, we provide professional mobile notary service throughout Charlotte, NC.
              </p>
            </section>
            
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Documents We Commonly Notarize</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Important Information Before the Appointment</h2>
                  <p className="text-slate-600 leading-relaxed">
                    All signers must be willing, aware, and able to communicate during the notarization. A valid government-issued photo ID is required. We cannot provide legal advice or tell a signer which documents they need.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Why Choose Integrity Closings CLT</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUs.map((reason, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{reason}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "What documents do you notarize for estate attorneys?",
                    a: "We frequently notarize a wide variety of estate documents including Last Wills and Testaments, Revocable Living Trusts, Durable Powers of Attorney, Healthcare Powers of Attorney, Advance Directives, and Beneficiary Designations."
                  },
                  {
                    q: "Can you provide witnesses for estate document signings?",
                    a: "Yes, we can arrange for impartial witnesses if requested in advance. However, an additional fee may apply per witness. In many cases, family members who are not named in the documents can also serve as witnesses, depending on the document requirements."
                  },
                  {
                    q: "Do I need to draft my own trust or will before you arrive?",
                    a: "Yes. As Notaries Public, we are legally prohibited from drafting legal documents or providing legal advice. Your documents must be fully prepared by an estate attorney or drawn up yourself prior to our arrival."
                  },
                  {
                    q: "Will you travel to an elder care facility or hospital for the notarization?",
                    a: "Absolutely. We specialize in mobile services and frequently travel to hospitals, nursing homes, and assisted living facilities throughout the Charlotte area to notarize estate documents for patients and residents."
                  },
                  {
                    q: "What happens if the signer has dementia or cognitive decline?",
                    a: "By law, the notary must independently verify that the signer is aware of what they are signing and doing so willingly. If the signer cannot communicate effectively or does not understand the document due to cognitive decline or heavy medication, we cannot proceed with the notarization."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Areas We Serve</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We provide estate document notarization in Charlotte, Matthews, Mint Hill, Concord, Pineville, Monroe, and nearby areas in Mecklenburg and Union County.
              </p>
            </section>
            
            <div className="text-center pt-10 border-t border-slate-100">
              <div className="inline-flex flex-col items-center">
                <p className="text-xl font-bold text-slate-900 mb-6">
                  Need an estate document notarized in Charlotte, NC?
                </p>
                <a 
                  href="tel:9803724103" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call or text 980-372-4103 to book your mobile notary appointment today.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
