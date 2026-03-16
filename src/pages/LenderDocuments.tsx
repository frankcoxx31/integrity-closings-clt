import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LenderDocuments() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative">
            <img src="/lender-sent-documents.png" alt="Lender Provided Documents" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white text-center px-4">Lender Provided Documents</h1>
            </div>
          </div>
          <div className="p-8 sm:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Specialized Handling for Loan Packages</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              When lenders send documents directly to borrowers, it can be overwhelming to ensure everything is signed, dated, and notarized correctly. We specialize in handling lender-provided documents, ensuring full compliance with lender instructions.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Our Comprehensive Service Includes:</h3>
            <ul className="space-y-3 mb-8">
              {[
                'Printing of Electronic Documents (eDocs)', 
                'Guiding Borrowers Through the Package', 
                'Ensuring No Missed Signatures or Initials', 
                'Scanbacks for Immediate Review', 
                'Prompt FedEx/UPS Shipping'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Attention to Detail</h3>
              <p className="text-blue-800">We know that a single missed signature can delay a funding. Our meticulous review process guarantees that your lender-provided documents are executed flawlessly and returned on time.</p>
            </div>
            <div className="text-center">
              <Link to="/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Schedule Document Signing <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
