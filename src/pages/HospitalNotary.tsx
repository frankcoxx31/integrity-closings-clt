import { ArrowLeft, CheckCircle, Info, MapPin, Phone, Hospital, Heart, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const hospitalNotarySchema = {
  "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Hospital & Bedside Notary",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Mobile notary services for patients, families, and caregivers at hospitals, nursing homes, and care facilities in Charlotte, NC.",
          "url": "https://www.integrityclosingsclt.com/hospital-notary-charlotte-nc"
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
              "name": "Hospital & Bedside Notary",
              "item": "https://www.integrityclosingsclt.com/hospital-notary-charlotte-nc"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can you come to a hospital room same-day?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we frequently fulfill same-day requests for hospital bedside notarizations. However, we ask that you secure approval from the nursing staff regarding visitation policies before we arrive."
              }
            },
            {
              "@type": "Question",
              "name": "What if the patient does not have a physical ID on them?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "If a physical ID (like a Driver's License or Passport) was left at home, North Carolina law may allow the use of credible identifying witnesses. Call us directly to discuss the specific circumstances so we can verify if this option is legally viable."
              }
            },
            {
              "@type": "Question",
              "name": "Does the patient need to be awake and communicative?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. By law, the notary must assess that the signer is alert, aware of what they are signing, and signing willingly. We cannot notarize documents for a patient who is unconscious, heavily medicated to the point of impairment, or unable to communicate."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need to print the documents, or can you bring them?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We typically ask that you print the documents beforehand or have the hospital social worker print them. If that is impossible, we can offer document printing services for an additional convenience fee if you email us the files prior to the appointment."
              }
            },
            {
              "@type": "Question",
              "name": "Can a nurse or doctor act as a witness?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hospital staff and doctors are usually prohibited by hospital policy from acting as witnesses for legal documents. We recommend arranging for friends or non-beneficiary family members to act as witnesses. If needed, we can try to provide a witness for an additional fee."
              }
            }
          ]
        }
  ]
};

export default function HospitalNotary() {
  useEffect(() => {
    document.title = "Hospital & Bedside Notary Charlotte NC | Mobile Notary";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Need a notary at a hospital in Charlotte, NC? We provide mobile bedside notary services for patients and families at Atrium, Novant, and care facilities.");
    }
  }, []);

  const commonDocuments = [
    "Power of Attorney",
    "Healthcare Proxy",
    "Living Will",
    "Advance Directives",
    "HIPAA Authorizations",
    "Financial Documents",
    "Affidavits",
    "Estate Planning Documents"
  ];

  const appointmentInfo = [
    "All signers must be alert, aware, and able to communicate.",
    "A valid government-issued photo ID is required for all signers.",
    "We cannot provide legal advice or explain the contents of documents.",
    "Please ensure the signer is awake and ready at the scheduled time."
  ];

  const whyChooseUs = [
    "Experienced with hospital and care facility visits.",
    "Professional, patient, and respectful service.",
    "Same-day and after-hours appointments available.",
    "Mobile service to all Charlotte area hospitals."
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalNotarySchema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/mobile-notary-charlotte-nc" className="inline-flex items-center text-brand-600 hover:text-brand-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Services
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
              alt="Hospital Notary in Charlotte NC" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="p-8 sm:p-12">
            <nav className="text-sm text-slate-500 mb-6 font-sans">
              <Link to="/" className="hover:text-brand-600">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/mobile-notary-charlotte-nc" className="hover:text-brand-600">Services</Link>
              <span className="mx-2">›</span>
              <span className="text-slate-700">Hospital & Bedside Notary</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Hospital & Bedside Notary in Charlotte, NC
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Need a notary at a hospital in Charlotte, NC? Integrity Closings CLT provides mobile bedside notary services for patients, families, and caregivers at Atrium Health Carolinas Medical Center, Novant Health Presbyterian Medical Center, Atrium Health Pineville, and rehabilitation and care facilities throughout the Charlotte metro. We travel directly to the patient's room to notarize important documents quickly and professionally, without the family needing to leave the hospital.
            </p>

            <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:9805058050"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 980-505-8050
              </a>
              <a
                href="sms:9805058050"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-200"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Text 980-505-8050
              </a>
            </div>
            <p className="text-center text-slate-500 -mt-6 mb-10 text-sm">To schedule a hospital notary appointment in Charlotte, NC — same-day requests welcome.</p>
            
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Hospital className="w-6 h-6 text-brand-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Mobile Hospital Notary Services in Charlotte, NC</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                We provide mobile notary services at hospitals, nursing homes, rehabilitation centers, and assisted living facilities throughout Charlotte, NC. If a signer cannot travel, we come directly to their location — a hospital bed, an ICU waiting room, or a rehab facility room.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Families in Charlotte often need a bedside notary on short notice: a parent is admitted and needs a Power of Attorney signed before surgery, a spouse needs a Healthcare Proxy notarized during an extended hospital stay, or a hospital social worker requests HIPAA authorization paperwork before discharge planning can begin. We understand these situations are stressful, and we work directly with hospital staff, charge nurses, and social workers to make the notarization as smooth as possible.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Documents We Commonly Notarize</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">What Does a Hospital Notary Visit Cost?</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  North Carolina law caps the notarial fee at $10 per notarized principal signature, regardless of where the notarization takes place.
                </p>
                <p>
                  For a hospital or bedside visit, a separate travel fee applies at the current IRS mileage rate, calculated from our office to the hospital. There is no separate "hospital surcharge" — you're paying the statutory notary fee plus mileage, the same as any other mobile appointment.
                </p>
                <p>
                  Call or text us with the hospital name and how many signatures are needed, and we'll give you the exact total before you book — no surprises at bedside.
                </p>
              </div>
            </section>

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

            <section className="mb-12 p-6 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Important Information Before Your Appointment</h2>
                  <ul className="space-y-3">
                    {appointmentInfo.map((info, i) => (
                      <li key={i} className="flex items-start text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-3 mt-2 flex-shrink-0" />
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <ShieldCheck className="w-6 h-6 text-brand-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Why Choose Integrity Closings CLT?</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUs.map((reason, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-600 mr-3 flex-shrink-0 mt-0.5" />
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
                    q: "Can you come to a hospital room same-day?",
                    a: "Yes, we frequently fulfill same-day requests for hospital bedside notarizations. However, we ask that you secure approval from the nursing staff regarding visitation policies before we arrive."
                  },
                  {
                    q: "What if the patient does not have a physical ID on them?",
                    a: "If a physical ID (like a Driver's License or Passport) was left at home, North Carolina law may allow the use of credible identifying witnesses. Call us directly to discuss the specific circumstances so we can verify if this option is legally viable."
                  },
                  {
                    q: "Does the patient need to be awake and communicative?",
                    a: "Absolutely. By law, the notary must assess that the signer is alert, aware of what they are signing, and signing willingly. We cannot notarize documents for a patient who is unconscious, heavily medicated to the point of impairment, or unable to communicate."
                  },
                  {
                    q: "Do I need to print the documents, or can you bring them?",
                    a: "We typically ask that you print the documents beforehand or have the hospital social worker print them. If that is impossible, we can offer document printing services for an additional convenience fee if you email us the files prior to the appointment."
                  },
                  {
                    q: "Can a nurse or doctor act as a witness?",
                    a: "Hospital staff and doctors are usually prohibited by hospital policy from acting as witnesses for legal documents. We recommend arranging for friends or non-beneficiary family members to act as witnesses. If needed, we can try to provide a witness for an additional fee."
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
                <MapPin className="w-6 h-6 text-brand-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Areas We Serve</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                We serve all major hospitals and care facilities in Charlotte, NC and the surrounding metro, including Atrium Health Carolinas Medical Center, Novant Health Presbyterian Medical Center Charlotte, Atrium Health Pineville, CMC-Mercy, and rehabilitation centers throughout Mecklenburg, Union, and Cabarrus counties.
              </p>
              <p className="text-slate-500 text-sm">
                Need a notary for a resident at a nursing home or assisted living facility instead of a hospital? See our <Link to="/nursing-home-notary-charlotte-nc" className="text-brand-600 hover:underline">Nursing Home & Assisted Living Notary</Link> page.
              </p>
            </section>
            
            <div className="text-center pt-10 border-t border-slate-100">
              <div className="inline-flex flex-col items-center">
                <p className="text-xl font-bold text-slate-900 mb-6">
                  Need a Hospital Notary Now?
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:9805058050"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call 980-505-8050
                  </a>
                  <a
                    href="sms:9805058050"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-200"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Text 980-505-8050
                  </a>
                </div>
                <p className="mt-4 text-slate-500">
                  Reliable mobile notary service for Charlotte hospitals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
