import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LenderProvidedDocuments() {
  const items = [
    { name: "Refinance Packages", description: "Comprehensive sets of documents required to close a mortgage refinance." },
    { name: "Buyer/Seller Packages", description: "Complete sets of documents needed for the purchase or sale of real estate." },
    { name: "Loan Modifications", description: "Agreements altering the terms of an existing loan, often to prevent foreclosure." },
    { name: "HELOCs", description: "Documents for establishing a Home Equity Line of Credit." },
    { name: "Reverse Mortgages", description: "Specialized loan packages for seniors converting home equity into cash." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/mobile-notary-services" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Services
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative bg-slate-100">
            <img src="/lender-provided-documents.png" alt="Lender Provided Documents" className="w-full h-full object-cover" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Lender Provided Documents</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide professional mobile notary and loan signing agent services for lender-provided document packages. We ensure all signatures, dates, and initials are properly executed for a smooth closing process.
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
              <a href="PASTE_MY_BOOKING_URL_HERE" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
