import { ArrowLeft, CheckCircle, Info, MapPin, Phone, Hospital, Heart, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function HospitalNotary() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Hospital Notary Charlotte NC | Mobile Notary for Patients & Families";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Need a notary at a hospital in Charlotte, NC? We provide mobile notary services for patients and families at Atrium Health, Novant Health, and care facilities.");
    }

    // JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Hospital Notary in Charlotte, NC",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Integrity Closings CLT",
        "url": "https://www.integrityclosingsclt.com/"
      },
      "areaServed": {
        "@type": "City",
        "name": "Charlotte"
      },
      "serviceType": "Hospital Notary Services",
      "description": "Mobile notary services for patients, families, and caregivers at hospitals, nursing homes, and care facilities in Charlotte, NC.",
      "url": "https://www.integrityclosingsclt.com/hospital-notary-charlotte-nc"
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/mobile-notary-charlotte-nc" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
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
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Hospital Notary in Charlotte, NC – We Come to You
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Need a notary at a hospital in Charlotte, NC? Integrity Closings CLT provides mobile notary services for patients, families, and caregivers. We travel to hospitals, nursing homes, and care facilities to notarize important documents quickly and professionally.
            </p>

            <div className="mb-10 text-center">
              <a 
                href="tel:9803724103" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call or text 980-372-4103 to schedule a hospital notary appointment.
              </a>
            </div>
            
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Hospital className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Mobile Hospital Notary Services</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We provide mobile notary services at hospitals, nursing homes, rehabilitation centers, and assisted living facilities throughout Charlotte, NC. If a signer cannot travel, we come directly to their location.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Documents We Commonly Notarize</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
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
                <ShieldCheck className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Why Choose Integrity Closings CLT?</h2>
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
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Areas We Serve</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We serve all major hospitals and care facilities in Charlotte, NC, including Atrium Health, Novant Health, and surrounding rehabilitation centers.
              </p>
            </section>
            
            <div className="text-center pt-10 border-t border-slate-100">
              <div className="inline-flex flex-col items-center">
                <p className="text-xl font-bold text-slate-900 mb-6">
                  Need a Hospital Notary Now?
                </p>
                <a 
                  href="tel:9803724103" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call or text 980-372-4103
                </a>
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
