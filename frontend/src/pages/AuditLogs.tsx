import { Settings, Shield, Clock, Fingerprint } from 'lucide-react';

export const AuditLogs = () => {
  // Placeholder data simulating the backend AuditLog structure
  const logs = [
    { id: 1, action: 'LOGIN', admin: 'Jane Doe', entity: '-', time: '2026-08-27 19:30', ip: '192.168.1.1' },
    { id: 2, action: 'CREATE_STUDENT', admin: 'Jane Doe', entity: 'Student SE20260015', time: '2026-08-27 19:35', ip: '192.168.1.1' },
    { id: 3, action: 'ENROLL_STUDENT', admin: 'Jane Doe', entity: 'Enrollment ID 45', time: '2026-08-27 19:38', ip: '192.168.1.1' },
    { id: 4, action: 'UPDATE_COURSE', admin: 'John Smith', entity: 'Course SENG101', time: '2026-08-27 20:12', ip: '10.0.0.5' },
    { id: 5, action: 'AI_ACTION', admin: 'SYSTEM', entity: 'Global Validation Update', time: '2026-08-27 21:05', ip: '127.0.0.1' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center mb-10 gap-4">
        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner mr-2">
          <Shield size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">System Audit Logs</h1>
          <p className="text-slate-500 mt-1">Immutable security history and administrative tracking.</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden relative shadow-lg animate-slide-in">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/50 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>

        <div className="overflow-x-auto relative z-10">
          <table className="min-w-full divide-y divide-slate-100 border-b border-slate-100">
            <thead>
              <tr className="bg-slate-50/80 backdrop-blur-sm">
                <th scope="col" className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
                  <Settings size={14} className="mr-2" /> Action
                </th>
                <th scope="col" className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Administrator
                </th>
                <th scope="col" className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Target Entity
                </th>
                <th scope="col" className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <Fingerprint size={14} className="inline mr-2" /> IP Address
                </th>
                <th scope="col" className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
                  <Clock size={14} className="mr-2" /> Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/60 divide-y divide-slate-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-indigo-50/50 transition-colors group">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-lg shadow-sm ${
                      log.action.includes('CREATE') ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                      log.action.includes('UPDATE') ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      log.action.includes('DELETE') ? 'bg-red-100 text-red-700 border border-red-200' :
                      log.action.includes('LOGIN') ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' :
                      'bg-purple-100 text-purple-700 border border-purple-200'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs mr-3 border border-white shadow-sm group-hover:scale-110 transition-transform">
                        {log.admin === 'SYSTEM' ? 'AI' : log.admin.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-900 font-bold">{log.admin}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                    {log.entity}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-500 font-mono tracking-wider bg-slate-50/50 group-hover:bg-transparent transition-colors">
                    {log.ip}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">
                    {log.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-8 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Showing latest 5 entries</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-sm cursor-not-allowed">Previous</button>
            <button className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-white border border-slate-200 rounded-md shadow-sm hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
