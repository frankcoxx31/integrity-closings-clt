import { X, Calendar, User, MapPin, FileText, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface NewSigningFormProps {
  onClose: () => void;
}

export default function NewSigningForm({ onClose }: NewSigningFormProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-xl font-bold">Schedule New Signing</h2>
            <p className="text-blue-100 text-sm">Create a new client appointment.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <User className="w-3 h-3" /> Client Name
              </label>
              <input type="text" placeholder="John Doe" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <FileText className="w-3 h-3" /> Service Type
              </label>
              <select className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors bg-white">
                <option>General Notary</option>
                <option>Loan Signing</option>
                <option>Estate Documents</option>
                <option>Hospital Visit</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Date
              </label>
              <input type="date" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Clock className="w-3 h-3" /> Time
              </label>
              <input type="time" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Signing Location
            </label>
            <input type="text" placeholder="123 Example St, Charlotte, NC" className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" required />
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-4 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              Create Appointment
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
