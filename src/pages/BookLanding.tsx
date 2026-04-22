import { Phone, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BookLanding() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Need a Notary in Charlotte? | We Come to You";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Same-day mobile notary services in Charlotte, NC. We travel to your home, office, hospital, or nursing home. Call (980) 372-4103.");
    }
  }, []);

  const phone = "(980) 372-4103";
  const tel = "tel:9803724103";

  const services = [
    { emoji: "📋", text: "Estate Planning Documents (Wills, Trusts, Power of Attorney)" },
    { emoji: "🏠", text: "Loan Signings & Real Estate Closings" },
    { emoji: "🏥", text: "Hospital & Nursing Home Visits" },
    { emoji: "⏰", text: "After-Hours & Weekend Appointments" },
    { emoji: "📄", text: "General Notary Work (Affidavits, Deeds, Contracts)" }
  ];

  return (
    <div className="min-h-screen bg-[#EEF0FD] flex flex-col items-center py-10 px-4 font-sans text-[#1E2D4E]">
      {/* Logo */}
      <div className="mb-10">
        <Link to="/">
          <img 
            src="/logo.jpg" 
            alt="Integrity Closings CLT" 
            className="h-20 w-auto"
            referrerPolicy="no-referrer"
          />
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-3xl font-extrabold text-center leading-tight mb-4 text-[#1E2D4E]">
          Need a Notary in Charlotte? We Come to You.
        </h1>
        
        <p className="text-lg text-center text-slate-600 mb-8 font-medium">
          Same-day mobile notary services at your home, office, hospital, or nursing home.
        </p>

        {/* Services List */}
        <div className="w-full space-y-4 mb-10">
          {services.map((service, index) => (
            <div key={index} className="flex items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-2xl mr-3 shrink-0">{service.emoji}</span>
              <span className="text-base font-bold text-[#1E2D4E] leading-snug">{service.text}</span>
            </div>
          ))}
        </div>

        {/* Actions Section */}
        <div className="w-full flex flex-col gap-4 mb-8">
          {/* Primary CTA */}
          <a
            href={tel}
            className="w-full bg-[#1E2D4E] hover:bg-[#2a3c61] text-white text-xl font-bold py-5 px-4 rounded-2xl shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <Phone className="w-6 h-6" />
            Call {phone}
          </a>

          {/* Secondary CTA */}
          <Link
            to="/booking"
            className="w-full bg-white border-2 border-[#5B6FE8] text-[#5B6FE8] hover:bg-[#5B6FE8] hover:text-white text-xl font-bold py-5 px-4 rounded-2xl shadow-sm hover:shadow-md transform transition hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <Calendar className="w-6 h-6" />
            Book Online
          </Link>
        </div>

        {/* Trust/Credentials Bar */}
        <div className="w-full border-t border-slate-100 pt-6">
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-center text-[#1E2D4E]/70 leading-relaxed">
            NNA Certified | $100K E&O Insured | Background Screened | 9+ Years Experience
          </p>
        </div>
      </div>
      
      {/* Disclaimer / Additional Info (Optional, but keeping footer minimal as requested) */}
      <div className="mt-8 text-center text-slate-500 text-xs">
        © {new Date().getFullYear()} Integrity Closings CLT. Licensed & Insured.
      </div>
    </div>
  );
}
