import { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, Hospital, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  // Bedside callers are usually in a hurry, so this expands in place rather
  // than navigating them away from the popup.
  const [showBedside, setShowBedside] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenWelcomePopup');
    
    if (!hasSeenPopup) {
      // Show popup after 1.5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that the user has seen the popup so it doesn't keep showing up
    sessionStorage.setItem('hasSeenWelcomePopup', 'true');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="px-6 pt-10 pb-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo.jpg"
              alt="Integrity Closings CLT"
              className="h-12 w-auto mix-blend-multiply object-contain"
              width="342"
              height="103"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-brand-950 mb-4">
            Need A Notary Now!
          </h2>
          
          {/* Body Text */}
          <p className="text-brand-950 mb-4 text-base leading-relaxed px-2 font-medium">
            If you need a notary immediately, use the buttons below or dial <a href="tel:9805058050" className="text-brand-700 font-bold hover:underline">(980)-505-8050</a> and ask for Frank Coxx.
          </p>
          
          <p className="text-brand-950 mb-8 text-base px-2 font-medium">
            Leave a message if no answer and he'll call you back asap...
          </p>
          
          {/* Buttons */}
          <div className="space-y-3">
            {/* Primary Button: Text/Call */}
            <a 
              href="sms:9805058050" 
              onClick={handleClose}
              className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-md"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Text Now 980-505-8050
            </a>

            {/* Urgent Button: Hospital / nursing home bedside signings */}
            <div className="rounded-xl bg-amber-50 border border-amber-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowBedside(v => !v)}
                aria-expanded={showBedside}
                className="flex items-center justify-center w-full py-3 px-6 text-amber-900 font-bold hover:bg-amber-100 transition-colors"
              >
                <Hospital className="w-5 h-5 mr-2 text-amber-600" />
                24/7 Hospital &amp; Bedside
                <ChevronDown className={`w-4 h-4 ml-2 text-amber-600 transition-transform ${showBedside ? 'rotate-180' : ''}`} />
              </button>

              {showBedside && (
                <div className="px-4 pb-4 pt-1 space-y-3 text-center">
                  <p className="text-sm text-amber-900 leading-relaxed">
                    Hospitals, nursing homes, hospice, rehab and assisted living — day or night.
                    Call and we'll confirm the visit on the phone.
                  </p>

                  <a
                    href="tel:9805058050"
                    onClick={handleClose}
                    className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-amber-600 text-white font-bold text-lg hover:bg-amber-700 transition-colors shadow-md"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call (980) 505-8050
                  </a>

                  <Link
                    to="/hospital-notary-charlotte-nc"
                    onClick={handleClose}
                    className="block text-sm font-semibold text-amber-800 underline hover:text-amber-900"
                  >
                    What to have ready before we arrive
                  </Link>
                </div>
              )}
            </div>

            {/* Secondary Button: Book Online */}
            <Link
              to="/booking"
              onClick={handleClose}
              className="flex items-center justify-center w-full py-3 px-6 rounded-xl bg-slate-100 text-brand-950 font-bold hover:bg-slate-200 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2 text-brand-700" />
              Book Online
            </Link>
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className="h-2 w-full bg-gradient-to-r from-brand-400 via-indigo-500 to-purple-500"></div>
      </div>
    </div>
  );
}
