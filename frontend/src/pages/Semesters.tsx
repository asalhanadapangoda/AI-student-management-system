import { useState, useEffect } from 'react';
import { CalendarDays, Plus, Loader2 } from 'lucide-react';
import api from '../services/api';

export const Semesters = () => {
  const [semesters, setSemesters] = useState<any[]>([]);
  const [academicYears, setAcademicYears] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    academicYearId: '',
    semesterNumber: 1,
    name: '',
    startDate: '',
    endDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [semRes, yearRes] = await Promise.all([
        api.get('/semesters'),
        api.get('/academic-years')
      ]);
      setSemesters(semRes.data);
      setAcademicYears(yearRes.data);
    } catch (err) {
      console.error('Failed to load semesters', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setFormData({
      academicYearId: academicYears.length > 0 ? academicYears[0].academicYearId : '',
      semesterNumber: 1,
      name: '',
      startDate: '',
      endDate: ''
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
      await api.post('/semesters', {
        ...formData,
        academicYearId: parseInt(formData.academicYearId as string)
      });
      closeModal();
      fetchData();
    } catch (err) {
      console.error('Failed to save semester', err);
      alert('Failed to save semester. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAcademicYearLabel = (id: number) => {
    const year = academicYears.find(y => y.academicYearId === id);
    return year ? year.yearLabel : 'Unknown Year';
  };

  return (
    <div className="max-w-6xl mx-auto pb-10 animate-slide-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">Semesters</h1>
          <p className="text-slate-500 mt-1">Manage academic terms and periods.</p>
        </div>
        <button 
          onClick={openModal}
          className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={18} className="mr-2" /> Add Semester
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
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Year</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Semester</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">End Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {semesters.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <CalendarDays className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                    <p>No semesters found.</p>
                  </td>
                </tr>
              ) : (
                semesters.map((sem) => (
                  <tr key={sem.semesterId} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-indigo-600 bg-indigo-50 inline-flex px-3 py-1 rounded-lg border border-indigo-100">
                        {getAcademicYearLabel(sem.academicYearId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mr-4 font-bold">
                          {sem.semesterNumber}
                        </div>
                        <div className="text-sm font-bold text-slate-900">{sem.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{sem.startDate || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{sem.endDate || '-'}</div>
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
              <h3 className="text-xl font-bold leading-6 text-slate-900 font-['Outfit'] mb-6">Add Semester</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Year</label>
                    <select
                      required
                      value={formData.academicYearId}
                      onChange={(e) => setFormData({...formData, academicYearId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                    >
                      <option value="">-- Select Year --</option>
                      {academicYears.map(y => (
                        <option key={y.academicYearId} value={y.academicYearId}>{y.yearLabel}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Semester Number (1, 2, 3...)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.semesterNumber}
                      onChange={(e) => setFormData({...formData, semesterNumber: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Semester Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      placeholder="e.g. Fall 2026"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      />
                    </div>
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
                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Save Semester'}
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
