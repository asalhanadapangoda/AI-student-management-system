import { useState, useEffect } from 'react';
import { Layers, Plus, Loader2 } from 'lucide-react';
import api from '../services/api';

export const CourseOfferings = () => {
  const [offerings, setOfferings] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [semesters, setSemesters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    courseId: '',
    semesterId: '',
    maxCapacity: 50
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [offRes, courseRes, semRes] = await Promise.all([
        api.get('/course-offerings'),
        api.get('/courses'),
        api.get('/semesters')
      ]);
      setOfferings(offRes.data);
      setCourses(courseRes.data);
      setSemesters(semRes.data);
    } catch (err) {
      console.error('Failed to load data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setFormData({
      courseId: courses.length > 0 ? courses[0].courseId : '',
      semesterId: semesters.length > 0 ? semesters[0].semesterId : '',
      maxCapacity: 50
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/course-offerings', {
        ...formData,
        courseId: parseInt(formData.courseId as string),
        semesterId: parseInt(formData.semesterId as string)
      });
      closeModal();
      fetchData();
    } catch (err) {
      console.error('Failed to save course offering', err);
      alert('Failed to save offering. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10 animate-slide-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">Course Offerings</h1>
          <p className="text-slate-500 mt-1">Schedule courses for specific semesters.</p>
        </div>
        <button 
          onClick={openModal}
          className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={18} className="mr-2" /> Add Offering
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-indigo-600 h-10 w-10" />
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Semester</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Capacity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {offerings.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    <Layers className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                    <p>No course offerings found.</p>
                  </td>
                </tr>
              ) : (
                offerings.map((offering) => (
                  <tr key={offering.courseOfferingId} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold font-mono rounded border border-slate-200 mr-3">
                          {offering.courseCode}
                        </div>
                        <div className="text-sm font-bold text-slate-900">{offering.courseName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-indigo-600 bg-indigo-50 inline-flex px-3 py-1 rounded-lg border border-indigo-100">
                        {offering.semesterName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{offering.maxCapacity} Students</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}></div>

            <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <h3 className="text-xl font-bold leading-6 text-slate-900 font-['Outfit'] mb-6">Add Course Offering</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Course</label>
                    <select
                      required
                      value={formData.courseId}
                      onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                    >
                      <option value="">-- Select Course --</option>
                      {courses.map(c => (
                        <option key={c.courseId} value={c.courseId}>{c.courseCode} - {c.courseName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Semester</label>
                    <select
                      required
                      value={formData.semesterId}
                      onChange={(e) => setFormData({...formData, semesterId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                    >
                      <option value="">-- Select Semester --</option>
                      {semesters.map(s => (
                        <option key={s.semesterId} value={s.semesterId}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Max Capacity</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.maxCapacity}
                      onChange={(e) => setFormData({...formData, maxCapacity: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 flex justify-center items-center"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Save Offering'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
