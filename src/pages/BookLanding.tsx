import { CheckCircle2, Phone, Mail } from 'lucide-react';
import { useEffect } from 'react';
import Logo from '../components/Logo';

export default function BookLanding() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Book Charlotte's Mobile Notary | Same-Day Service";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Need a notary now? Charlotte's premier mobile notary service. We come to you—home, office, or hospital. Call or text (980) 372-4103.");
    }
  }, []);

  const phone = "(980) 372-4103";
  const tel = "tel:9803724103";
  const email = "fcoxx@integrityclosingsclt.com";

  return (
    <div className="min-h-screen bg-[#EEF0FD] flex flex-col items-center py-10 px-4 font-sans text-[#1E2D4E]">
      {/* Logo */}
      <div className="mb-12">
        <Logo className="h-16 w-auto" />
      </div>

      {/* Main Content Card */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-bold text-center leading-tight mb-4 text-[#1E2D4E]">
          Charlotte's Mobile Notary — We Come to You
        </h1>
        
        <p className="text-lg text-center text-slate-600 mb-8 font-medium">
          Same-day appointments available. We travel to your home, office, hospital, or nursing home.
        </p>

        {/* Benefits List */}
        <div className="w-full space-y-4 mb-10">
          <div className="flex items-start">
            <CheckCircle2 className="w-6 h-6 text-[#5B6FE8] mr-3 shrink-0" />
            <span className="text-lg font-semibold italic">NNA Certified & Background Screened</span>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="w-6 h-6 text-[#5B6FE8] mr-3 shrink-0" />
            <span className="text-lg font-semibold italic">$100K E&O Insured — 7+ Years Experience</span>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="w-6 h-6 text-[#5B6FE8] mr-3 shrink-0" />
            <span className="text-lg font-semibold italic">Serving Charlotte, Mint Hill & Surrounding Areas</span>
          </div>
        </div>

        {/* Primary CTA */}
        <a
          href={tel}
          className="w-full bg-[#5B6FE8] hover:bg-[#4A5BD7] text-white text-xl md:text-2xl font-bold py-6 px-4 rounded-2xl shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 flex items-center justify-center gap-3 mb-6"
        >
          <Phone className="w-6 h-6" />
          Call or Text {phone}
        </a>

        {/* Secondary CTA */}
        <a 
          href={`mailto:${email}`}
          className="text-[#5B6FE8] hover:text-[#1E2D4E] font-bold text-lg flex items-center gap-2 transition-colors"
        >
          <Mail className="w-5 h-5" />
          Or email {email}
        </a>
      </div>

      {/* Trust Bar */}
      <div className="mt-auto pt-16 pb-8 text-center">
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#1E2D4E]/60 space-x-1 sm:space-x-4">
          <span className="inline-block whitespace-nowrap">NNA Certified</span>
          <span className="hidden sm:inline">|</span>
          <span className="inline-block whitespace-nowrap">$100K E&O Insured</span>
          <span className="hidden sm:inline">|</span>
          <span className="inline-block whitespace-nowrap">Background Screened</span>
          <span className="hidden sm:inline">|</span>
          <span className="inline-block whitespace-nowrap">NC Commission Active</span>
        </p>
      </div>
    </div>
  );
}
