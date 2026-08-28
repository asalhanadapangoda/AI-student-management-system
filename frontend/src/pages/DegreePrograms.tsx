import { useState, useEffect } from 'react';
import { GraduationCap, Search, Edit2, Trash2, Plus, Loader2 } from 'lucide-react';
import api from '../services/api';

export const DegreePrograms = () => {
  const [degrees, setDegrees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDegree, setEditingDegree] = useState<any>(null);
  const [formData, setFormData] = useState({
    programCode: '',
    programName: '',
    department: '',
    durationYears: 4
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDegrees();
  }, []);

  const fetchDegrees = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/degree-programs');
      setDegrees(res.data);
    } catch (err) {
      console.error('Failed to load degree programs', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this degree program?')) return;
    try {
      await api.delete(`/degree-programs/${id}`);
      fetchDegrees();
    } catch (err) {
      console.error('Failed to delete degree program', err);
      alert('Could not delete degree program. It may be linked to existing students.');
    }
  };

  const openModal = (degree: any = null) => {
    if (degree) {
      setEditingDegree(degree);
      setFormData({
        programCode: degree.programCode,
        programName: degree.programName,
        department: degree.department,
        durationYears: degree.durationYears
      });
    } else {
      setEditingDegree(null);
      setFormData({
        programCode: '',
        programName: '',
        department: '',
        durationYears: 4
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDegree(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingDegree) {
        await api.put(`/degree-programs/${editingDegree.degreeProgramId}`, formData);
      } else {
        await api.post('/degree-programs', formData);
      }
      closeModal();
      fetchDegrees();
    } catch (err) {
      console.error('Failed to save degree program', err);
      alert('Failed to save degree program. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDegrees = degrees.filter(d => 
    d.programCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto pb-10 animate-slide-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">Degree Programs</h1>
          <p className="text-slate-500 mt-1">Manage the institution's academic degree offerings.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={18} className="mr-2" /> Add Degree Program
        </button>
      </div>

      <div className="glass-panel p-2 rounded-2xl mb-8">
        <div className="relative flex items-center bg-white rounded-xl p-2 shadow-sm">
          <Search className="absolute left-6 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-14 pr-4 py-3 text-slate-800 bg-transparent placeholder-slate-400 focus:outline-none sm:text-sm font-medium"
            placeholder="Search by code, name, or department..."
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-indigo-600 h-10 w-10" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDegrees.map(degree => (
            <div key={degree.degreeProgramId} className="glass-panel rounded-2xl overflow-hidden hover:shadow-lg transition-all border border-slate-100 group flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <GraduationCap size={24} />
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openModal(degree)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(degree.degreeProgramId)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="inline-block px-2.5 py-1 mb-3 bg-slate-100 text-slate-700 text-xs font-bold font-mono rounded-lg border border-slate-200">
                  {degree.programCode}
                </div>
                <h3 className="text-xl font-bold text-slate-800 font-['Outfit'] mb-2 leading-tight">
                  {degree.programName}
                </h3>
              </div>
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-600">{degree.department}</span>
                <div className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                  <span className="text-indigo-600 font-bold mr-1">{degree.durationYears}</span> Yrs
                </div>
              </div>
            </div>
          ))}
          
          {filteredDegrees.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
              <GraduationCap className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No degree programs found</h3>
              <p className="mt-1 text-sm text-slate-500">Get started by creating a new degree program.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}></div>

            <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <h3 className="text-xl font-bold leading-6 text-slate-900 font-['Outfit'] mb-6">
                {editingDegree ? 'Edit Degree Program' : 'Add New Degree Program'}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Program Code</label>
                    <input
                      type="text"
                      required
                      value={formData.programCode}
                      onChange={(e) => setFormData({...formData, programCode: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      placeholder="e.g. BSCS"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Program Name</label>
                    <input
                      type="text"
                      required
                      value={formData.programName}
                      onChange={(e) => setFormData({...formData, programName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      placeholder="e.g. Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      placeholder="e.g. Computing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (Years)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="7"
                      value={formData.durationYears}
                      onChange={(e) => setFormData({...formData, durationYears: parseInt(e.target.value)})}
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
                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Save Program'}
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
