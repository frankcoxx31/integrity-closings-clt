import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GeneralNotary() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative">
            <img src="/General Notary work.png" alt="General Mobile Notary" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white text-center px-4">General Mobile Notary</h1>
            </div>
          </div>
          <div className="p-8 sm:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Convenient Notarization at Your Location</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Skip the hassle of finding a local notary office, waiting in lines, or dealing with limited business hours. Our general mobile notary service brings the notary public directly to you—whether you're at home, at the office, or even a local coffee shop.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Common Documents We Notarize:</h3>
            <ul className="space-y-3 mb-8">
              {[
                'Affidavits & Sworn Statements', 
                'Auto Title Transfers', 
                'I-9 Employment Verification', 
                'Travel Consent Forms for Minors', 
                'Contracts & Business Agreements'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Fast, Flexible, and Reliable</h3>
              <p className="text-blue-800">We offer flexible scheduling, including evenings and weekends, to accommodate your busy lifestyle. Just let us know where and when, and we'll be there to ensure your documents are legally and properly notarized.</p>
            </div>
            <div className="text-center">
              <a href="https://icclt.com/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Request a Notary <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
