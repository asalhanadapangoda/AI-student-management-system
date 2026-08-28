import { useState, useEffect } from 'react';
import { BookOpen, Search, Edit2, Trash2, Plus, Loader2 } from 'lucide-react';
import api from '../services/api';

export const CourseList = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    credits: 3,
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error('Failed to delete course', err);
      alert('Could not delete course. It may be linked to existing enrollments or offerings.');
    }
  };

  const openModal = (course: any = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        courseCode: course.courseCode,
        courseName: course.courseName,
        credits: course.credits,
        description: course.description || ''
      });
    } else {
      setEditingCourse(null);
      setFormData({
        courseCode: '',
        courseName: '',
        credits: 3,
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCourse) {
        await api.put(`/courses/${editingCourse.courseId}`, formData);
      } else {
        await api.post('/courses', formData);
      }
      closeModal();
      fetchCourses();
    } catch (err) {
      console.error('Failed to save course', err);
      alert('Failed to save course. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCourses = courses.filter(c => 
    c.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto pb-10 animate-slide-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">Course Directory</h1>
          <p className="text-slate-500 mt-1">Manage the institution's course catalog.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={18} className="mr-2" /> Add Course
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
            placeholder="Search by course code or name..."
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-indigo-600 h-10 w-10" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.courseId} className="glass-panel rounded-2xl overflow-hidden hover:shadow-lg transition-all border border-slate-100 group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <BookOpen size={24} />
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openModal(course)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(course.courseId)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="inline-block px-2.5 py-1 mb-3 bg-slate-100 text-slate-700 text-xs font-bold font-mono rounded-lg border border-slate-200">
                  {course.courseCode}
                </div>
                <h3 className="text-lg font-bold text-slate-800 font-['Outfit'] mb-2 leading-tight">
                  {course.courseName}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  {course.description || "No description provided."}
                </p>
                <div className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 px-3 py-2 rounded-lg inline-flex">
                  <span className="text-indigo-600 font-bold mr-1">{course.credits}</span> Credits
                </div>
              </div>
            </div>
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
              <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No courses found</h3>
              <p className="mt-1 text-sm text-slate-500">Get started by creating a new course.</p>
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
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Course Code</label>
                    <input
                      type="text"
                      required
                      value={formData.courseCode}
                      onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      placeholder="e.g. CS101"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Course Name</label>
                    <input
                      type="text"
                      required
                      value={formData.courseName}
                      onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      placeholder="e.g. Introduction to Programming"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Credits</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="10"
                      value={formData.credits}
                      onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      placeholder="Optional course description..."
                    ></textarea>
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
                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Save Course'}
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
