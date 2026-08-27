import { Users, BookOpen, ActivitySquare, TrendingUp, UserPlus, FileEdit, Clock } from 'lucide-react';

export const Dashboard = () => {
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
            <p className="text-4xl font-extrabold text-slate-800 mb-1 font-['Outfit']">1,250</p>
            <p className="text-xs font-medium text-emerald-500 flex items-center">
              <TrendingUp size={12} className="mr-1" /> +12% from last month
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
            <p className="text-4xl font-extrabold text-slate-800 mb-1 font-['Outfit']">1,180</p>
            <p className="text-xs font-medium text-slate-400 flex items-center">
              Current enrolled students
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
            <p className="text-4xl font-extrabold text-slate-800 mb-1 font-['Outfit']">48</p>
            <p className="text-xs font-medium text-slate-400 flex items-center">
              Active across 8 programs
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
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Enrollments</p>
            </div>
            <p className="text-4xl font-extrabold text-slate-800 mb-1 font-['Outfit']">4,350</p>
            <p className="text-xs font-medium text-blue-500 flex items-center">
              Current semester total
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
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            View All Logs &rarr;
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Activity 1 */}
          <div className="flex items-start group">
            <div className="flex flex-col items-center mr-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <UserPlus size={18} className="text-emerald-600" />
              </div>
              <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
            </div>
            <div className="pb-4">
              <p className="text-slate-800 font-medium">New Student Registered</p>
              <p className="text-sm text-slate-500 mt-1">Admin created student <span className="font-mono text-indigo-600 bg-indigo-50 px-1 rounded">SE20260015</span> in Software Engineering.</p>
              <p className="text-xs text-slate-400 mt-2 font-medium">10 minutes ago</p>
            </div>
          </div>

          {/* Activity 2 */}
          <div className="flex items-start group">
            <div className="flex flex-col items-center mr-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <FileEdit size={18} className="text-amber-600" />
              </div>
              <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
            </div>
            <div className="pb-4">
              <p className="text-slate-800 font-medium">Profile Updated</p>
              <p className="text-sm text-slate-500 mt-1">Admin updated contact information for <span className="font-mono text-indigo-600 bg-indigo-50 px-1 rounded">SE20260012</span>.</p>
              <p className="text-xs text-slate-400 mt-2 font-medium">45 minutes ago</p>
            </div>
          </div>

          {/* Activity 3 */}
          <div className="flex items-start group">
            <div className="flex flex-col items-center mr-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <BookOpen size={18} className="text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-slate-800 font-medium">Course Enrollment</p>
              <p className="text-sm text-slate-500 mt-1">Admin enrolled student <span className="font-mono text-indigo-600 bg-indigo-50 px-1 rounded">SE20260015</span> into SENG101.</p>
              <p className="text-xs text-slate-400 mt-2 font-medium">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
