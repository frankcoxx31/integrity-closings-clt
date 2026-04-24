import { useState } from 'react';
import { Calendar, Plus, Search, Filter, MoreHorizontal, FileText, CheckCircle2, Clock } from 'lucide-react';
import NewSigningForm from '../components/NewSigningForm';

export default function Appointments() {
  const [isNewSigningOpen, setIsNewSigningOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for signings
  const signings = [
    { id: '1', client: 'Alice Johnson', service: 'Loan Signing', date: '2024-05-15', time: '10:00 AM', status: 'Scheduled' },
    { id: '2', client: 'Bob Smith', service: 'General Notary', date: '2024-05-15', time: '2:30 PM', status: 'Completed' },
    { id: '3', client: 'Charlie Brown', service: 'Estate Documents', date: '2024-05-16', time: '11:00 AM', status: 'Scheduled' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif">Appointments & Signings</h1>
            <p className="text-slate-600">Manage your scheduled signings and client appointments.</p>
          </div>
          <button 
            onClick={() => setIsNewSigningOpen(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Schedule Signing
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 bg-slate-50/50">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search signings..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors">
                <Calendar className="w-4 h-4" />
                Calendar View
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-bold tracking-wider">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Service Type</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {signings.map((signing) => (
                  <tr key={signing.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{signing.client}</div>
                      <div className="text-xs text-slate-500">ID: #{signing.id}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 text-sm">
                      {signing.service}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-slate-700 mb-1">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                        {signing.date}
                      </div>
                      <div className="flex items-center text-xs text-slate-500">
                        <Clock className="w-4 h-4 mr-2 text-slate-400" />
                        {signing.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        signing.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {signing.status === 'Completed' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {signing.status}
                      </span>
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
          
          <div className="p-4 border-t border-slate-200 bg-slate-50 text-center text-sm text-slate-500">
            Showing {signings.length} signings
          </div>
        </div>
      </div>

      {isNewSigningOpen && (
        <NewSigningForm onClose={() => setIsNewSigningOpen(false)} />
      )}
    </div>
  );
}
