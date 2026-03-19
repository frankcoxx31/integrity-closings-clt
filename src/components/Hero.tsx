import { Calendar, Phone, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-slate-900 text-white min-h-[60vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/hero-bj.jpg")' }}
      ></div>
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-slate-900/80 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-[60px]">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Mobile Notary in Charlotte, NC – We Come to You Same Day
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-4xl mx-auto">
          Professional Mobile Notary & Loan Signing Services in Charlotte, NC and Surrounding Areas. Available for Hospitals, Nursing Homes, Estate Documents, and Urgent Appointments.
        </p>
        <p className="text-lg text-blue-400 font-semibold mb-8">
          Same-Day Service Available • After Hours & Weekends • Experienced & Reliable
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-4xl mx-auto">
          <a href="/booking" 
            className="flex-1 inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-slate-900 bg-white hover:bg-slate-100 transition-colors"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Get An Appointment
          </a>
          <Link 
            to="/calculator" 
            className="flex-1 inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Quick Quote
          </Link>
          <a 
            href="tel:9803724103" 
            className="flex-1 inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now: 980-372-4103
          </a>
        </div>
        
        <div className="mt-12 text-slate-400 text-sm">
          <p>Fast, professional, and reliable service across Mecklenburg & surrounding counties.</p>
        </div>
      </div>
    </div>
  );
}
