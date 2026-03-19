import { ArrowLeft, CheckCircle, Info, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function PowerOfAttorneyEstateDocuments() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Power of Attorney Notary Charlotte NC | Estate Document Notary";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Mobile notary for power of attorney, trusts, wills, and estate documents in Charlotte, NC. Home, hospital, nursing home, and after-hours appointments available.");
    }

    // JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Power of Attorney & Estate Document Notary in Charlotte, NC",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Integrity Closings CLT",
        "url": "https://www.integrityclosingsclt.com/"
      },
      "areaServed": {
        "@type": "City",
        "name": "Charlotte"
      },
      "serviceType": "Power of Attorney & Estate Document Notary",
      "description": "Professional mobile notary for power of attorney, trusts, wills, and estate documents in Charlotte, NC. Home, hospital, nursing home, and after-hours appointments available.",
      "url": "https://www.integrityclosingsclt.com/power-of-attorney-estate-documents-charlotte-nc"
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const commonDocuments = [
    "Power of Attorney",
    "Durable Power of Attorney",
    "Healthcare Power of Attorney",
    "Advance Directives",
    "Living Wills",
    "Trust Documents",
    "Estate Planning Documents",
    "Affidavits",
    "Authorization Forms"
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
              alt="Power of Attorney & Estate Documents" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Power of Attorney & Estate Document Notary in Charlotte, NC
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Need a mobile notary for important estate planning documents? Integrity Closings CLT provides professional notarization for powers of attorney, trusts, wills, advance directives, affidavits, and other estate-related documents in Charlotte, NC and surrounding areas.
            </p>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">We Come to You</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We travel to homes, hospitals, nursing homes, rehabilitation centers, assisted living facilities, offices, and other convenient locations. If you need a document notarized for a loved one who cannot travel, mobile service makes the process easier and more convenient.
              </p>
            </section>
            
            <section className="mb-10">
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
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Clients Call Us</h2>
              <p className="text-slate-600 leading-relaxed">
                Clients often need estate documents notarized quickly and professionally. We help by providing mobile appointments, after-hours availability, and service at locations where signers may already be receiving care or assistance.
              </p>
            </section>
            
            <section className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Important Reminder</h2>
                  <p className="text-slate-600 leading-relaxed">
                    All signers must appear willing, aware, and able to communicate during the notarization. A valid government-issued photo ID is typically required. We cannot give legal advice or explain which document a signer should choose.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Areas We Serve</h2>
              <p className="text-slate-600 leading-relaxed">
                We serve Charlotte, Matthews, Mint Hill, Concord, Pineville, Monroe, and surrounding areas.
              </p>
            </section>
            
            <div className="text-center pt-10 border-t border-slate-100">
              <div className="inline-flex flex-col items-center">
                <p className="text-xl font-bold text-slate-900 mb-6">
                  Need a Power of Attorney or Estate Document Notarized?
                </p>
                <a 
                  href="tel:9803724103" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call or text 980-372-4103
                </a>
                <p className="mt-4 text-slate-500">
                  Schedule a mobile notary appointment in Charlotte, NC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
