import { X, User, FileText, Fingerprint, Calendar, CreditCard, PenTool } from 'lucide-react';
import { motion } from 'motion/react';

interface NewJournalEntryFormProps {
  onClose: () => void;
}

export default function NewJournalEntryForm({ onClose }: NewJournalEntryFormProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">New Journal Entry</h2>
              <p className="text-slate-400 text-sm">Official notarial record entry.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          {/* Signer Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <User className="w-4 h-4 text-blue-600" /> Signer Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Signer Full Name" className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" required />
              <input type="text" placeholder="Signer Address" className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" required />
            </div>
          </div>

          {/* Identification */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <CreditCard className="w-4 h-4 text-blue-600" /> Identification
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <select className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors bg-white">
                <option>Driver's License (NC)</option>
                <option>US Passport</option>
                <option>Military ID</option>
                <option>Other State ID</option>
              </select>
              <input type="text" placeholder="ID Number" className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" required />
            </div>
          </div>

          {/* Document Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText className="w-4 h-4 text-blue-600" /> Notarial Act
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Document Date" className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" required />
              <select className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors bg-white">
                <option>Acknowledgment</option>
                <option>Jurat (Oath/Affirmation)</option>
                <option>Verification/Proof</option>
                <option>Copy Certification</option>
              </select>
            </div>
            <textarea placeholder="Document Title / Description (e.g., General Power of Attorney)" className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors h-24" required />
          </div>

          {/* Compliance Info */}
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg flex gap-3">
             <Fingerprint className="w-5 h-5 text-yellow-600 flex-shrink-0" />
             <p className="text-xs text-yellow-800">
               Confirm that the signer is appearing physically before you, has the capacity to sign, and is not under duress. 
               The identity of the individual must be verified according to NC General Statutes.
             </p>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-4 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Discard
            </button>
            <button 
              type="submit" 
              className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
            >
              Sign Journal Entry
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
