import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Edit2, Trash2, Plus, Loader2, GraduationCap, BookOpen } from 'lucide-react';
import api from '../services/api';

export const StudentList = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to deactivate this student?")) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Failed to delete student", error);
      alert("Failed to deactivate student.");
    }
  };

  const filteredStudents = students.filter(student => 
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto pb-10 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight flex items-center">
            <Users className="mr-3 text-indigo-600" size={32} />
            Student Directory
          </h1>
          <p className="text-slate-500 mt-1 ml-11">Manage and view all enrolled students.</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            to="/students/search" 
            className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            <Search size={18} className="mr-2" />
            Lookup Profile
          </Link>
          <Link 
            to="/students/new" 
            className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={18} className="mr-2" />
            Register Student
          </Link>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-lg relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>

        {/* Search Bar inside table header */}
        <div className="p-6 border-b border-slate-100 bg-white/40 flex justify-between items-center relative z-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 text-slate-800 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none shadow-sm"
              placeholder="Search by name or ID..."
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            Total: <span className="font-bold text-slate-900">{filteredStudents.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto relative z-10 min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-20">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
              <p className="text-indigo-600 font-medium">Loading records...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-100">
              <thead>
                <tr className="bg-slate-50/80 backdrop-blur-sm">
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Student</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">ID Number</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Program</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Contact</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/60 divide-y divide-slate-50">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No students found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.studentId} className="hover:bg-indigo-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold mr-3 border border-indigo-200 shadow-sm">
                            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{student.firstName} {student.lastName}</div>
                            <div className="text-xs text-slate-500">DOB: {student.dateOfBirth}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {student.studentNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-700 font-medium">
                          <GraduationCap size={16} className="text-indigo-400 mr-2" />
                          Program ID: {student.degreeProgramId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-700">{student.email}</div>
                        <div className="text-xs text-slate-500">{student.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/students/${student.studentId}/enroll`} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Manage Enrollments">
                            <BookOpen size={18} />
                          </Link>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(student.studentId)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Deactivate">
                            <Trash2 size={18} />
                          </button>
                        </div>
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
