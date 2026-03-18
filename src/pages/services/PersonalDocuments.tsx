import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function PersonalDocuments() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Estate Planning Notary Services in Charlotte, NC",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Integrity Closings CLT",
        "url": "https://www.integrityclosingsclt.com/"
      },
      "areaServed": {
        "@type": "City",
        "name": "Charlotte"
      },
      "serviceType": "Estate Planning Notary Services",
      "description": "Professional mobile notary services for estate planning documents, including wills, trusts, and medical directives in Charlotte, NC.",
      "url": "https://www.integrityclosingsclt.com/estate-planning-notary-charlotte-nc"
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const items = [
    { name: "Affidavits", description: "Sworn statements made under oath, used for various legal and personal matters." },
    { name: "Power of Attorney", description: "Legal authorization for someone to act on your behalf in private affairs, business, or legal matters." },
    { name: "Wills & Trusts", description: "Essential estate planning documents that dictate how your assets will be managed and distributed." },
    { name: "Medical Directives", description: "Documents specifying your preferences for medical care if you are unable to make decisions yourself." },
    { name: "Passport Applications", description: "Required forms and copies needed to apply for or renew a passport." }
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
            <img src="/personal-documents.png" alt="Personal Documents" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Personal Documents</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide professional mobile notary services for a wide variety of personal documents. Whether you're handling estate planning, medical preferences, or sworn statements, we ensure your documents are properly executed and legally binding.
            </p>
            
            <div className="space-y-6 mb-10">
              {items.map((item, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-6 border-t border-slate-100">
              <a href="/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
