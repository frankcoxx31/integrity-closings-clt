import { CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header Image */}
      <div className="h-64 sm:h-80 w-full mb-8">
        <img src="/hero-bj.jpg" alt="About Integrity Closings CLT" className="w-full h-full object-cover object-top" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 font-serif">About Us</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-8 sm:p-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                Integrity Closings CLT
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We are a premier mobile notary service based in Charlotte, NC, dedicated to providing convenient, professional, and reliable notarization services. We understand that your time is valuable, which is why we come to you—whether you're at home, in the office, at a hospital, or a local coffee shop.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our team is experienced in handling sensitive documents with care and confidentiality. From real estate loan signings to urgent hospital notarizations, we ensure your documents are executed correctly the first time.
              </p>
              
              <div className="space-y-4">
                {[
                  'Certified Loan Signing Agents',
                  'Background Screened & E&O Insured',
                  'Same-Day & Weekend Appointments',
                  'Serving Mecklenburg & Surrounding Counties'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 relative">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 opacity-10"></div>
              <img 
                src="/about%20page.jpg" 
                alt="Professional Notary Service" 
                className="relative rounded-2xl shadow-xl w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
