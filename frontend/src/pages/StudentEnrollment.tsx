import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Calendar, Loader2, Plus, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

export const StudentEnrollment = () => {
  const { id } = useParams<{ id: string }>();
  
  const [student, setStudent] = useState<any>(null);
  const [offerings, setOfferings] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  
  useEffect(() => {
    fetchData();
  }, [id]);
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      const [studentRes, offeringsRes, enrollmentsRes] = await Promise.all([
        api.get(`/students/${id}`),
        api.get('/course-offerings'),
        api.get(`/students/${id}/enrollments`)
      ]);
      
      setStudent(studentRes.data);
      setOfferings(offeringsRes.data);
      setEnrollments(enrollmentsRes.data);
      
    } catch (error) {
      console.error('Failed to load enrollment data', error);
      alert('Error loading data');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfferingId) return;
    
    try {
      await api.post('/enrollments', {
        studentId: id,
        courseOfferingId: selectedOfferingId,
        status: 'ENROLLED'
      });
      setSelectedOfferingId('');
      fetchData(); // refresh list
    } catch (error) {
      console.error('Failed to enroll', error);
      alert('Failed to enroll student. They might already be enrolled.');
    }
  };
  
  const handleRemove = async (enrollmentId: number) => {
    if (!window.confirm('Remove this course from the student?')) return;
    try {
      await api.delete(`/enrollments/${enrollmentId}`);
      fetchData();
    } catch (error) {
      console.error('Failed to remove enrollment', error);
      alert('Failed to remove course.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-indigo-600 h-8 w-8" />
      </div>
    );
  }

  // Filter out offerings the student is already enrolled in
  const availableOfferings = offerings.filter(
    o => !enrollments.some(e => e.courseOfferingId === o.courseOfferingId)
  );

  return (
    <div className="max-w-5xl mx-auto pb-10 animate-slide-in">
      <Link to="/students" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6">
        <ArrowLeft size={16} className="mr-1.5" /> Back to Student List
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">Course Registration</h1>
        <p className="text-slate-500 mt-1">
          Manage enrollments for <span className="font-bold text-slate-700">{student?.firstName} {student?.lastName}</span> ({student?.studentNumber})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Enroll New Course Form */}
        <div className="col-span-1">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <Plus size={18} className="text-indigo-500 mr-2" /> Add Course
            </h3>
            <form onSubmit={handleEnroll}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Available Offerings</label>
                <select 
                  value={selectedOfferingId}
                  onChange={(e) => setSelectedOfferingId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  required
                >
                  <option value="">-- Select Course --</option>
                  {availableOfferings.map(o => (
                    <option key={o.courseOfferingId} value={o.courseOfferingId}>
                      {o.courseCode} - {o.courseName} ({o.semesterName})
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={!selectedOfferingId}
                className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                Enroll Student
              </button>
            </form>
          </div>
        </div>

        {/* Current Enrollments */}
        <div className="col-span-1 md:col-span-2">
          <div className="glass-panel p-6 rounded-2xl h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <BookOpen size={18} className="text-emerald-500 mr-2" /> Current Enrollments
            </h3>
            
            {enrollments.length === 0 ? (
              <div className="bg-slate-50/50 border border-slate-200 border-dashed rounded-xl p-8 text-center text-slate-500">
                No active enrollments for this student.
              </div>
            ) : (
              <div className="space-y-3">
                {enrollments.map(e => (
                  <div key={e.enrollmentId} className="bg-white border border-slate-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
                    <div>
                      <div className="flex items-center text-sm font-bold text-slate-800">
                        {e.courseCode} - {e.courseName}
                        {e.status === 'ENROLLED' && <CheckCircle2 size={14} className="text-emerald-500 ml-2" />}
                      </div>
                      <div className="flex items-center text-xs text-slate-500 mt-1 font-medium">
                        <Calendar size={12} className="mr-1" /> {e.semesterName} ({e.academicYear || 'Unknown Year'})
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemove(e.enrollmentId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Course"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
