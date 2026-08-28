import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ActivitySquare, Loader2, BookOpen, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

export const GlobalEnrollments = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [enrollRes, studentsRes] = await Promise.all([
        api.get('/enrollments'),
        api.get('/students')
      ]);
      setEnrollments(enrollRes.data);
      setStudents(studentsRes.data);
    } catch (error) {
      console.error('Failed to fetch enrollments data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentName = (studentId: number) => {
    const student = students.find(s => s.studentId === studentId);
    return student ? `${student.firstName} ${student.lastName} (${student.studentNumber})` : 'Unknown Student';
  };

  return (
    <div className="max-w-7xl mx-auto pb-10 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight flex items-center">
            <ActivitySquare className="mr-3 text-indigo-600" size={32} />
            Global Enrollments
          </h1>
          <p className="text-slate-500 mt-1 ml-11">View all recent student course enrollments across all programs.</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-lg relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>

        <div className="p-6 border-b border-slate-100 bg-white/40 flex justify-between items-center relative z-10">
          <div className="text-sm font-medium text-slate-500">
            Total Enrollments: <span className="font-bold text-slate-900">{enrollments.length}</span>
          </div>
          <Link 
            to="/students" 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            Manage via Student Directory <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto relative z-10 min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-20">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
              <p className="text-indigo-600 font-medium">Loading enrollments...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-100">
              <thead>
                <tr className="bg-slate-50/80 backdrop-blur-sm">
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Student</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Course Offering</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Semester</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white/60 divide-y divide-slate-50">
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No enrollments found. Go to the Student Directory to enroll students in courses.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((e) => (
                    <tr key={e.enrollmentId} className="hover:bg-indigo-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{getStudentName(e.studentId)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-bold text-slate-800">
                          <BookOpen size={16} className="text-indigo-400 mr-2" />
                          {e.courseCode} - {e.courseName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-xs text-slate-600 font-medium">
                          <Calendar size={14} className="mr-1 text-slate-400" />
                          {e.semesterName} ({e.academicYear || 'Unknown Year'})
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-md ${
                          e.status === 'ENROLLED' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {e.status === 'ENROLLED' && <CheckCircle2 size={12} className="mr-1 my-auto" />}
                          {e.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/students/${e.studentId}/enroll`} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors font-semibold">
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
