import { useState, useEffect } from 'react';
import { Users, BookOpen, ActivitySquare, TrendingUp, UserPlus, FileEdit, Clock } from 'lucide-react';
import { getDashboardStats, getAuditLogs } from '../services/api';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [stats, setStats] = useState<any>({ totalStudents: 0, activeStudents: 0, totalCourses: 0, currentSemester: '' });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, logsData] = await Promise.all([
          getDashboardStats(),
          getAuditLogs()
        ]);
        setStats(statsData);
        setRecentLogs(logsData.slice(0, 5)); // Take only top 5 for dashboard
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">System Overview</h1>
        <p className="text-slate-500 mt-1">Real-time metrics and recent administrative activity.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Stat Card 1 */}
        <div className="glass-panel rounded-2xl p-6 card-hover relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-300">
            <Users size={80} className="text-indigo-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                <Users size={20} className="text-indigo-600" />
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Students</p>
            </div>
            <p className="text-4xl font-extrabold text-slate-800 mb-1 font-['Outfit']">{stats.totalStudents}</p>
            <p className="text-xs font-medium text-emerald-500 flex items-center">
              All registered students
            </p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="glass-panel rounded-2xl p-6 card-hover relative overflow-hidden group delay-100">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-300">
            <ActivitySquare size={80} className="text-emerald-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mr-3">
                <ActivitySquare size={20} className="text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Status</p>
            </div>
            <p className="text-4xl font-extrabold text-slate-800 mb-1 font-['Outfit']">{stats.activeStudents}</p>
            <p className="text-xs font-medium text-slate-400 flex items-center">
              Current active students
            </p>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="glass-panel rounded-2xl p-6 card-hover relative overflow-hidden group delay-200">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-300">
            <BookOpen size={80} className="text-violet-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center mr-3">
                <BookOpen size={20} className="text-violet-600" />
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Courses</p>
            </div>
            <p className="text-4xl font-extrabold text-slate-800 mb-1 font-['Outfit']">{stats.totalCourses}</p>
            <p className="text-xs font-medium text-slate-400 flex items-center">
              Active courses in catalog
            </p>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="glass-panel rounded-2xl p-6 card-hover relative overflow-hidden group delay-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-300">
            <TrendingUp size={80} className="text-blue-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                <TrendingUp size={20} className="text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Semester</p>
            </div>
            <p className="text-2xl font-extrabold text-slate-800 mb-1 font-['Outfit']">{stats.currentSemester}</p>
            <p className="text-xs font-medium text-blue-500 flex items-center">
              Current academic term
            </p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="glass-panel rounded-2xl p-8 card-hover">
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800 font-['Outfit'] flex items-center">
            <Clock className="mr-2 text-indigo-500" size={24} /> Recent Activities
          </h2>
          <Link to="/audit-logs" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            View All Logs &rarr;
          </Link>
        </div>
        
        <div className="space-y-6">
          {recentLogs.length === 0 ? (
            <p className="text-slate-500 text-sm">No recent activity found.</p>
          ) : (
            recentLogs.map((log: any, index: number) => (
              <div key={log.auditLogId} className="flex items-start group">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform ${
                    log.action.includes('CREATE') ? 'bg-emerald-100 text-emerald-600' :
                    log.action.includes('UPDATE') ? 'bg-amber-100 text-amber-600' :
                    log.action.includes('DELETE') ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {log.action.includes('LOGIN') ? <ActivitySquare size={18} /> :
                     log.action.includes('STUDENT') ? <UserPlus size={18} /> :
                     <FileEdit size={18} />}
                  </div>
                  {index < recentLogs.length - 1 && <div className="w-0.5 h-full bg-slate-200 mt-2"></div>}
                </div>
                <div className="pb-4">
                  <p className="text-slate-800 font-medium">{log.action}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {log.adminName} ({log.adminEmail}) on <span className="font-semibold">{log.entityType}</span> {log.entityId && `#${log.entityId}`}
                  </p>
                  {log.newValue && <p className="text-xs text-slate-500 mt-1">{log.newValue}</p>}
                  <p className="text-xs text-slate-400 mt-2 font-medium">
                    {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
