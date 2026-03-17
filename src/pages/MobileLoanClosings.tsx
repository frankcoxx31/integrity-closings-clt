import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileLoanClosings() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative">
            <img src="/mobile-notary.jpg" alt="Mobile Loan Closings" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white text-center px-4">Mobile Loan Closings</h1>
            </div>
          </div>
          <div className="p-8 sm:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Expert Real Estate Signing Agent Services</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Real estate transactions require precision, expertise, and a flawless execution of documents. As certified and background-screened Loan Signing Agents, we provide seamless mobile closing services for title companies, escrow officers, lenders, and real estate professionals.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Types of Closings We Facilitate:</h3>
            <ul className="space-y-3 mb-8">
              {[
                'Buyer & Seller Packages', 
                'Refinances (VA, FHA, Conventional)', 
                'Home Equity Lines of Credit (HELOC)', 
                'Reverse Mortgages', 
                'Commercial Real Estate Loans'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-2">The Integrity Closings CLT Difference</h3>
              <p className="text-blue-800">We don't just stamp documents; we guide signers through their loan packages, ensuring all signatures, dates, and initials are completed accurately. We guarantee prompt document return and clear communication throughout the entire process.</p>
            </div>
            <div className="text-center">
              <a href="/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Book a Closing <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
