import { ArrowLeft, Phone, MessageSquare, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmergencyAvailability from '../components/EmergencyAvailability';

// Question + answer capsules. The FAQPage schema below reuses this exact text
// so the structured data always matches what's visible on the page.
const faqs = [
  {
    q: 'Can you come to a hospital room in Charlotte today?',
    a: "Yes. Same-day and 24/7 emergency bedside notarization is the core of what I do. Call or text me with the hospital and how many signatures are needed, and I come to the room — often within hours, once nursing staff clears the visit.",
  },
  {
    q: 'How fast can an emergency notary arrive?',
    a: 'It depends on your location and the time of day, but same-day is the norm and I can often reach a Charlotte-area hospital or home within a couple of hours. For overnight and holiday requests, calling reaches me fastest.',
  },
  {
    q: 'What if the patient does not have a physical ID?',
    a: "If a driver's license or passport was left at home, North Carolina law (G.S. 10B-3) may allow the use of one or two credible identifying witnesses instead. Call me to describe the situation and I will confirm whether that option is legally viable before I arrive.",
  },
  {
    q: 'Can you notarize for someone who is sedated or in the ICU?',
    a: 'Only if the signer is alert enough to understand the document and is signing willingly. By law I must confirm awareness and free will, so I cannot notarize for a patient who is unconscious or too heavily medicated to communicate.',
  },
  {
    q: 'What emergency documents do you notarize?',
    a: 'The urgent ones families need most: a durable or healthcare power of attorney before surgery, an advance directive or living will during an admission, hospice and HIPAA paperwork, and last-minute estate or real estate documents.',
  },
  {
    q: 'Which Charlotte hospitals and facilities do you cover?',
    a: 'The major Atrium Health and Novant Health hospitals, plus hospice, nursing homes, and assisted living facilities across Mecklenburg, Cabarrus, and Union counties — bedside, at home, or wherever the signer is.',
  },
];

const emergencySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      'name': 'Emergency & Same-Day Mobile Notary',
      'serviceType': 'Emergency Mobile Notary',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Integrity Closings CLT',
        'telephone': '980-505-8050',
        'url': 'https://www.integrityclosingsclt.com/',
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Charlotte' },
        { '@type': 'AdministrativeArea', 'name': 'Mecklenburg County, NC' },
        { '@type': 'AdministrativeArea', 'name': 'Cabarrus County, NC' },
        { '@type': 'AdministrativeArea', 'name': 'Union County, NC' },
      ],
      'hoursAvailable': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '00:00',
        'closes': '23:59',
      },
      'description':
        'Same-day and 24/7 emergency mobile notary in Charlotte, NC. Hospital bedside, nursing home, and at-home notarizations for powers of attorney, healthcare directives, and hospice documents.',
      'url': 'https://www.integrityclosingsclt.com/emergency-notary-charlotte-nc',
    },
    {
      '@type': 'FAQPage',
      'mainEntity': faqs.map((f) => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
      })),
    },
  ],
};

export default function EmergencyNotary() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(emergencySchema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/mobile-notary-charlotte-nc" className="inline-flex items-center text-brand-600 hover:text-brand-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Services
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-700 px-4 py-1.5 text-sm font-semibold mb-6">
            <Clock className="w-4 h-4" />
            Same-Day • 24/7 Emergency • Hospital Bedside
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Emergency & Same-Day Mobile Notary in Charlotte, NC
          </h1>

          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Need a notary at a hospital bedside, a nursing home, or your home in Charlotte <strong>today</strong>? I provide
            same-day and 24/7 emergency mobile notary service across the Charlotte metro — for pre-surgery powers of
            attorney, healthcare directives, hospice paperwork, and other documents that can't wait for business hours.
            When a family is in crisis, I come to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <a
              href="tel:9805058050"
              className="flex-1 inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call now: 980-505-8050
            </a>
            <a
              href="sms:9805058050"
              className="flex-1 inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-md text-brand-700 bg-brand-50 border-2 border-brand-600 hover:bg-brand-100 transition-colors"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Text 980-505-8050
            </a>
          </div>
          <p className="text-center text-slate-500 mb-10 text-sm">
            For overnight, weekend, and holiday emergencies, calling reaches me fastest.
          </p>

          <EmergencyAvailability facilityType="hospital, hospice, and nursing home" />

          {faqs.map((f) => (
            <section key={f.q} className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3 border-b-2 border-slate-900 pb-2">{f.q}</h2>
              <p className="text-lg font-semibold text-slate-900 leading-relaxed mb-3">{f.a}</p>
            </section>
          ))}

          <section className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center mb-3">
              <MapPin className="w-6 h-6 text-brand-600 mr-3" />
              <h2 className="text-2xl font-bold text-slate-900">Where I go</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Emergency and same-day service throughout Charlotte and the surrounding metro. For facility-specific detail,
              see my <Link to="/hospital-notary-charlotte-nc" className="text-brand-600 hover:underline">hospital &amp; bedside notary</Link>,{' '}
              <Link to="/nursing-home-notary-charlotte-nc" className="text-brand-600 hover:underline">nursing home notary</Link>, and{' '}
              <Link to="/after-hours-mobile-notary-charlotte-nc" className="text-brand-600 hover:underline">after-hours notary</Link> pages.
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center mb-3">
              <ShieldCheck className="w-6 h-6 text-brand-600 mr-3" />
              <h2 className="text-2xl font-bold text-slate-900">A note on what I can and can't do</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              I am a commissioned North Carolina Notary Public, not an attorney. I verify identity, confirm the signer is
              aware and willing, and witness the signature — I cannot draft documents or give legal advice. For the wording
              or legal effect of a document, consult a licensed North Carolina attorney.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
