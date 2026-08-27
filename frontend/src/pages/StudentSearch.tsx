import { useState } from 'react';
import { Search, Loader2, BookOpen, Clock, Calendar, Mail, Phone, Hash } from 'lucide-react';
import api from '../services/api';

export const StudentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setIsLoading(true);
      setError('');
      setStudent(null);
      
      const studentRes = await api.get(`/students/number/${searchTerm}`);
      setStudent(studentRes.data);
      
      // We will handle enrollments mapping when the real API returns them
      await api.get(`/students/${studentRes.data.studentId}/enrollments`);

    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Student not found. Please verify the unique ID.');
      } else {
        setError('Connection error. Could not retrieve student profile.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const groupedHistory = {
    '2026/2027': [
      { semester: 'Semester 1', courses: ['SENG101 - Introduction to SE', 'SENG102 - Programming I', 'SENG103 - Math'] },
      { semester: 'Semester 2', courses: ['SENG201 - Data Structures', 'SENG202 - Database Systems'] }
    ],
    '2027/2028': [
      { semester: 'Semester 1', courses: [] }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">Student Search</h1>
          <p className="text-slate-500 mt-1">Lookup student profiles and academic trajectories.</p>
        </div>
        <a 
          href="/students/new" 
          className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          + Register New Student
        </a>
      </div>

      <div className="glass-panel p-2 rounded-2xl mb-10">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 bg-white rounded-xl p-2 shadow-sm">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-indigo-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 text-slate-800 bg-transparent placeholder-slate-400 focus:outline-none sm:text-base font-medium"
              placeholder="e.g. SE20260001"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center items-center px-8 py-4 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all shadow-md shadow-indigo-500/20"
          >
            {isLoading ? <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> : 'Search Records'}
          </button>
        </form>
        {error && (
          <div className="mt-4 px-4 py-3 bg-red-50/50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center animate-slide-in">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
            {error}
          </div>
        )}
      </div>

      {student && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-in">
          
          {/* Premium Profile Card */}
          <div className="col-span-1">
            <div className="glass-panel rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 z-0 pointer-events-none"></div>
              
              {/* Header Banner */}
              <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="absolute -bottom-12 left-8 h-24 w-24 bg-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                  <div className="h-22 w-22 bg-slate-50 rounded-xl flex items-center justify-center text-3xl font-extrabold text-indigo-600 font-['Outfit'] border border-slate-100">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </div>
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-8 relative z-10">
                <h2 className="text-2xl font-extrabold text-slate-800 font-['Outfit'] tracking-tight">{student.firstName} {student.lastName}</h2>
                <div className="inline-flex items-center px-3 py-1 mt-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-lg text-sm font-bold font-mono shadow-sm">
                  <Hash size={14} className="mr-1 opacity-50" />
                  {student.studentNumber}
                </div>
                
                <div className="mt-8 space-y-5">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 mt-0.5 text-blue-500">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Academic Program</p>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">ID: {student.degreeProgramId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mr-3 mt-0.5 text-emerald-500">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">{student.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mr-3 mt-0.5 text-amber-500">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">{student.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mr-3 mt-0.5 text-purple-500">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date of Birth</p>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">{student.dateOfBirth}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Timeline */}
          <div className="col-span-1 lg:col-span-2">
            <div className="glass-panel rounded-3xl p-8 h-full">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 font-['Outfit'] flex items-center">
                  <Clock className="mr-3 text-indigo-500" size={24} /> Academic Timeline
                </h2>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Active Status
                </div>
              </div>
              
              <div className="space-y-8 pl-2">
                {Object.entries(groupedHistory).map(([year, semesters]) => (
                  <div key={year} className="relative">
                    <div className="flex items-center mb-4">
                      <div className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md z-10 flex items-center">
                        <Calendar size={14} className="mr-1.5 text-indigo-400" /> {year}
                      </div>
                    </div>
                    
                    <div className="ml-4 pl-8 border-l-2 border-indigo-100 space-y-6 pb-2">
                      {semesters.map((sem, idx) => (
                        <div key={idx} className="relative group">
                          {/* Timeline dot */}
                          <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-white border-4 border-indigo-500 group-hover:scale-125 transition-transform duration-300 shadow-sm"></div>
                          
                          <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center">
                            {sem.semester}
                            {sem.courses.length === 0 && <span className="ml-3 text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Upcoming</span>}
                          </h3>
                          
                          {sem.courses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {sem.courses.map((course, cIdx) => (
                                <div key={cIdx} className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm hover:border-indigo-200 transition-colors flex items-start">
                                  <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                    <BookOpen size={12} className="text-indigo-600" />
                                  </div>
                                  <span className="text-sm font-medium text-slate-700 leading-tight">
                                    {course}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="bg-slate-50/50 border border-slate-100 border-dashed rounded-xl p-4 text-center">
                              <p className="text-xs font-medium text-slate-400">No enrollments recorded for this term.</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
