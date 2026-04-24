import { useState } from 'react';
import { Book, Plus, Search, Filter, MoreHorizontal, FileText, CheckCircle2, Shield } from 'lucide-react';
import NewJournalEntryForm from '../components/NewJournalEntryForm';

export default function Journal() {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for journal entries
  const entries = [
    { id: '101', date: '2024-05-14', signer: 'Alice Johnson', document: 'Warranty Deed', type: 'Acknowledgment', fee: '$10.00' },
    { id: '102', date: '2024-05-14', signer: 'Bob Smith', document: 'Affidavit of Residency', type: 'Jurat', fee: '$10.00' },
    { id: '103', date: '2024-05-13', signer: 'Charlie Brown', document: 'Power of Attorney', type: 'Acknowledgment', fee: '$10.00' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Compliance Secure</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif">Notary Journal</h1>
            <p className="text-slate-600">Secure electronic record of all notarial acts performed.</p>
          </div>
          <button 
            onClick={() => setIsNewEntryOpen(true)}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            New Journal Entry
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 bg-slate-50/50">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by signer or document..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-bold tracking-wider">
                  <th className="px-6 py-4">Entry Date</th>
                  <th className="px-6 py-4">Signer Name</th>
                  <th className="px-6 py-4">Document Type</th>
                  <th className="px-6 py-4">Notarization</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-600">
                      {entry.date}
                      <div className="text-[10px] text-slate-400">Entry #{entry.id}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {entry.signer}
                    </td>
                    <td className="px-6 py-4 text-slate-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      {entry.document}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-medium">{entry.type}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter font-bold">Fee: {entry.fee}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <p>NC Notaries must maintain a journal of all notarial acts. Records must be kept for 10 years.</p>
              <p>Total Records: {entries.length}</p>
            </div>
          </div>
        </div>
      </div>

      {isNewEntryOpen && (
        <NewJournalEntryForm onClose={() => setIsNewEntryOpen(false)} />
      )}
    </div>
  );
}
