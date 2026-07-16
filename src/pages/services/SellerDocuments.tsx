import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function SellerDocuments() {
  useEffect(() => {
    document.title = "Seller Closing Documents Notary Charlotte NC | Integrity Closings CLT";
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seller-documents-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Seller Closing Document Notarization",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Mobile notary service for home sellers in Charlotte, NC — deeds, settlement statements, affidavits of title, and other seller closing package documents.",
          "url": "https://www.integrityclosingsclt.com/services/seller-documents"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What documents are in a seller closing package?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A typical seller package includes the Deed, Settlement Statement, Affidavit of Title, Bill of Sale, and a 1099-S form. The exact documents depend on the transaction and are prepared by the closing attorney or title company."
              }
            },
            {
              "@type": "Question",
              "name": "Can you notarize for a seller who lives out of state?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We regularly meet sellers wherever they are in the Charlotte area, and can coordinate with the closing attorney or title company to receive and return an out-of-state seller's package by mail or courier."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need to bring anything to the signing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Just a valid, unexpired government-issued photo ID for every person signing. The closing attorney or title company provides the documents themselves."
              }
            },
            {
              "@type": "Question",
              "name": "Can all sellers on the deed sign together?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we can notarize for multiple sellers in the same appointment if they're signing together, or schedule separate visits if they're not."
              }
            },
            {
              "@type": "Question",
              "name": "Will you return the signed package to the title company?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide scanbacks and prompt FedEx or UPS drop-off so the signed seller package reaches the title company or closing attorney in time for closing."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('seller-documents-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const items = [
    { name: "Deed", description: "The legal document transferring ownership of the property to the buyer." },
    { name: "Settlement Statement", description: "An itemized breakdown of the sale price, fees, and proceeds due to the seller." },
    { name: "Affidavit of Title", description: "The seller's sworn statement confirming clear ownership, free of undisclosed liens or claims." },
    { name: "Bill of Sale", description: "Documents any personal property (appliances, fixtures) included in the sale." },
    { name: "1099-S Form", description: "IRS form reporting the proceeds from the real estate sale." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/mobile-notary-charlotte-nc" className="inline-flex items-center text-brand-600 hover:text-brand-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Services
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative bg-slate-100">
            {/* TODO(owner): stock photo — replace with a real photo of Frank/the business. */}
            <img
              src="/seller-documents-charlotte-nc.webp"
              alt="Seller Document Notarization in Charlotte, NC"
              className="w-full h-full object-cover"
              width="1200"
              height="800"
            />
          </div>

          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Seller Documents</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide professional mobile notary services for home sellers closing on a property sale in Charlotte, NC. We come to you to notarize your seller closing package — accurately, on your schedule, and without a trip to the title company's office.
            </p>

            <div className="space-y-6 mb-10">
              {items.map((item, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-brand-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <section className="mb-12 mt-12 border-t border-slate-100 pt-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "What documents are in a seller closing package?",
                    a: "A typical seller package includes the Deed, Settlement Statement, Affidavit of Title, Bill of Sale, and a 1099-S form. The exact documents depend on the transaction and are prepared by the closing attorney or title company."
                  },
                  {
                    q: "Can you notarize for a seller who lives out of state?",
                    a: "Yes. We regularly meet sellers wherever they are in the Charlotte area, and can coordinate with the closing attorney or title company to receive and return an out-of-state seller's package by mail or courier."
                  },
                  {
                    q: "Do I need to bring anything to the signing?",
                    a: "Just a valid, unexpired government-issued photo ID for every person signing. The closing attorney or title company provides the documents themselves."
                  },
                  {
                    q: "Can all sellers on the deed sign together?",
                    a: "Yes, we can notarize for multiple sellers in the same appointment if they're signing together, or schedule separate visits if they're not."
                  },
                  {
                    q: "Will you return the signed package to the title company?",
                    a: "Yes, we provide scanbacks and prompt FedEx or UPS drop-off so the signed seller package reaches the title company or closing attorney in time for closing."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="text-center pt-6 border-t border-slate-100">
              <a href="/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
