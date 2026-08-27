import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  Settings, 
  LogOut,
  Menu,
  GraduationCap,
  ActivitySquare,
  Bell
} from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Course Offerings', path: '/offerings', icon: GraduationCap },
    { name: 'Enrollments', path: '/enrollments', icon: ActivitySquare },
    { name: 'Academic Years', path: '/academic-years', icon: Calendar },
    { name: 'Semesters', path: '/semesters', icon: Clock },
    { name: 'Audit Logs', path: '/audit-logs', icon: Settings },
  ];

  return (
    <div className="flex flex-col w-72 glass-sidebar h-screen text-slate-300 shadow-2xl relative z-20">
      <div className="flex items-center justify-center h-24 border-b border-slate-800/50 bg-slate-900/50 relative overflow-hidden">
        {/* Subtle glow behind logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full filter blur-[40px] pointer-events-none"></div>
        <div className="relative z-10 flex items-center">
          <GraduationCap size={28} className="text-indigo-400 mr-3" />
          <h1 className="text-2xl font-bold text-white tracking-widest font-['Outfit']">SMS<span className="text-indigo-400 font-light">PRO</span></h1>
        </div>
      </div>
      
      <div className="overflow-y-auto overflow-x-hidden flex-grow py-6 custom-scrollbar">
        <ul className="flex flex-col space-y-2 px-4">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 mt-4">Main Menu</p>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path} 
                end={item.path === '/'}
                className={({ isActive }) => 
                  `relative flex flex-row items-center h-12 focus:outline-none rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white shadow-lg shadow-indigo-900/50' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <item.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </span>
                <span className="ml-3 text-sm font-medium tracking-wide">{item.name}</span>
                
                {/* Active Indicator line */}
                <NavLink to={item.path} end={item.path === '/'}>
                  {({ isActive }) => isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                  )}
                </NavLink>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-6 border-t border-slate-800/50 bg-slate-900/30">
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
        >
          <LogOut size={20} className="mr-3" />
          Logout securely
        </button>
      </div>
    </div>
  );
};

export const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans relative overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-0 left-64 w-[500px] h-[500px] bg-purple-400/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>

      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <header className="flex items-center justify-between px-8 py-5 bg-white/60 backdrop-blur-md border-b border-white/40 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center">
            <button className="text-slate-500 hover:text-indigo-600 focus:outline-none lg:hidden transition-colors">
              <Menu size={24} />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-lg font-semibold text-slate-800 font-['Outfit']">Good morning, {user?.name?.split(' ')[0]} 👋</h2>
              <p className="text-xs text-slate-500">Here is what's happening with your institution today.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            <div className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:border-indigo-300 transition-colors">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">{user?.role}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
                {user?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 custom-scrollbar">
          <div className="animate-slide-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
