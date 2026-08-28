import { useState, useEffect } from 'react';
import { getAuditLogs } from '../services/api';
import { format } from 'date-fns';
import { Settings, Search, UserPlus, FileEdit, ActivitySquare, AlertTriangle } from 'lucide-react';

export const AuditLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAuditLogs();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch audit logs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.adminEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.entityType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight flex items-center">
            <Settings className="mr-3 text-indigo-600" size={32} />
            System Audit Logs
          </h1>
          <p className="text-slate-500 mt-1">Review all administrative actions taken in the system.</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-220px)]">
        <div className="p-4 border-b border-slate-200/60 bg-white/40 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <div className="text-sm text-slate-500">
            Showing <span className="font-semibold">{filteredLogs.length}</span> events
          </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-slate-50/30">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <AlertTriangle size={48} className="text-slate-300 mb-4" />
              <p>No audit logs found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div key={log.auditLogId} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        log.action.includes('CREATE') ? 'bg-emerald-100 text-emerald-600' :
                        log.action.includes('UPDATE') ? 'bg-amber-100 text-amber-600' :
                        log.action.includes('DELETE') ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {log.action.includes('LOGIN') ? <ActivitySquare size={16} /> :
                         log.action.includes('STUDENT') ? <UserPlus size={16} /> :
                         <FileEdit size={16} />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{log.action}</h3>
                        <p className="text-xs text-slate-500">{log.entityType} {log.entityId && `(ID: ${log.entityId})`}</p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">
                      {format(new Date(log.createdAt), 'MMM d, yyyy HH:mm:ss')}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="mb-1">
                      <span className="font-medium text-slate-700">Admin:</span> {log.adminName} ({log.adminEmail})
                    </p>
                    {log.newValue && (
                      <p>
                        <span className="font-medium text-slate-700">Details:</span> {log.newValue}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
