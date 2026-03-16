import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HospitalsNursingHomes() {
  const items = [
    { name: "Medical Power of Attorney", description: "Legal document designating someone to make healthcare decisions for you if you become incapacitated." },
    { name: "Living Wills", description: "Written statements detailing your desires regarding medical treatment in circumstances in which you are no longer able to express informed consent." },
    { name: "Advance Directives", description: "Legal documents that allow you to spell out your decisions about end-of-life care ahead of time." },
    { name: "HIPAA Authorizations", description: "Forms permitting healthcare providers to disclose your protected health information to specified individuals." },
    { name: "Healthcare Proxies", description: "Documents appointing an agent to legally make healthcare decisions on your behalf." }
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
            <img src="/hospitals-nursing-homes.png" alt="Hospitals & Nursing Homes" className="w-full h-full object-cover" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Hospitals & Nursing Homes</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide compassionate bedside notary services for patients in hospitals, nursing homes, and assisted living facilities. We handle sensitive medical and legal documents with care, patience, and professionalism.
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
              <a href="https://icclt.com/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
