import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, ChevronRight, Loader2, User, Phone, BookOpen, FileCheck, ArrowRight } from 'lucide-react';
import { 
  personalInfoSchema, 
  contactInfoSchema, 
  degreeInfoSchema
} from '../schemas/studentSchema';
import type { FullRegistrationData } from '../schemas/studentSchema';
import api from '../services/api';

const steps = [
  { name: 'Personal Information', icon: User },
  { name: 'Contact Information', icon: Phone },
  { name: 'Degree Program', icon: BookOpen },
  { name: 'Review & Submit', icon: FileCheck }
];

export const StudentRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FullRegistrationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ studentNumber: string, name: string } | null>(null);

  // Forms for each step
  const personalForm = useForm({ resolver: zodResolver(personalInfoSchema) });
  const contactForm = useForm({ resolver: zodResolver(contactInfoSchema) });
  const degreeForm = useForm({ resolver: zodResolver(degreeInfoSchema) });

  const onNextStep = async (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const onPrevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmitFinal = async () => {
    try {
      setIsSubmitting(true);
      
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        degreeProgramId: formData.degreeProgramId,
        addresses: [
          {
            addressLine1: formData.addressLine1,
            city: formData.city,
            district: formData.district,
            isCurrent: true
          }
        ]
      };

      const response = await api.post('/students', payload);
      setSuccessData({
        studentNumber: response.data.studentNumber,
        name: `${response.data.firstName} ${response.data.lastName}`
      });
    } catch (error) {
      console.error("Failed to register student", error);
      alert("Failed to register student. Please check the logs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="animate-slide-in flex items-center justify-center min-h-[70vh]">
        <div className="glass-panel p-10 rounded-3xl text-center max-w-lg w-full relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[50px] opacity-50"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2 font-['Outfit']">Success!</h2>
            <p className="text-slate-500 mb-8">Student registered securely in the system.</p>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl mb-8 border border-indigo-100 shadow-inner">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">Generated ID</p>
              <p className="text-4xl font-mono font-bold text-indigo-600 mb-2 tracking-tight">{successData.studentNumber}</p>
              <p className="text-sm text-slate-700 font-medium">{successData.name}</p>
            </div>

            <button 
              onClick={() => {
                setSuccessData(null);
                setFormData({});
                setCurrentStep(0);
                personalForm.reset();
                contactForm.reset();
                degreeForm.reset();
              }}
              className="w-full px-6 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Register Another Student
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">Onboard Student</h1>
        <p className="text-slate-500 mt-2">Complete the wizard below to enroll a new candidate.</p>
      </div>

      {/* Modern Stepper UI */}
      <div className="mb-12 relative">
        <div className="absolute top-6 left-12 right-12 h-1 bg-slate-200 rounded-full -z-10"></div>
        <div 
          className="absolute top-6 left-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full -z-10 transition-all duration-500 ease-out"
          style={{ width: `calc(${(currentStep / (steps.length - 1)) * 100}% - ${currentStep === 0 ? 0 : 24}px)` }}
        ></div>
        
        <div className="flex justify-between relative z-10 px-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > index;
            const isActive = currentStep === index;
            
            return (
              <div key={step.name} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isCompleted ? 'bg-indigo-600 text-white shadow-indigo-200' : 
                  isActive ? 'bg-white text-indigo-600 border-2 border-indigo-600 shadow-md scale-110' : 
                  'bg-white text-slate-400 border border-slate-200'
                }`}>
                  {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={isActive ? 22 : 20} />}
                </div>
                <span className={`mt-4 text-xs font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-indigo-600' : 
                  isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}>{step.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="glass-panel rounded-3xl p-10 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 animate-slide-in">
          {/* STEP 0: Personal Info */}
          {currentStep === 0 && (
            <form onSubmit={personalForm.handleSubmit(onNextStep)} className="space-y-6">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-semibold text-slate-800 font-['Outfit']">Personal Details</h2>
                <p className="text-xs text-slate-500">Please provide the student's legal name and birth date.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input {...personalForm.register('firstName')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="e.g. John" />
                  {personalForm.formState.errors.firstName && <p className="text-red-500 text-xs mt-2 font-medium">{String(personalForm.formState.errors.firstName.message)}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input {...personalForm.register('lastName')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="e.g. Doe" />
                  {personalForm.formState.errors.lastName && <p className="text-red-500 text-xs mt-2 font-medium">{String(personalForm.formState.errors.lastName.message)}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
                  <input type="date" {...personalForm.register('dateOfBirth')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-600" />
                  {personalForm.formState.errors.dateOfBirth && <p className="text-red-500 text-xs mt-2 font-medium">{String(personalForm.formState.errors.dateOfBirth.message)}</p>}
                </div>
              </div>
              <div className="flex justify-end pt-6 mt-6 border-t border-slate-100">
                <button type="submit" className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 flex items-center font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  Continue <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 1: Contact Info */}
          {currentStep === 1 && (
            <form onSubmit={contactForm.handleSubmit(onNextStep)} className="space-y-6">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-semibold text-slate-800 font-['Outfit']">Contact & Address</h2>
                <p className="text-xs text-slate-500">How can we reach the student?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input type="email" {...contactForm.register('email')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="student@example.com" />
                  {contactForm.formState.errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{String(contactForm.formState.errors.email.message)}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input {...contactForm.register('phone')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="+1 (555) 000-0000" />
                  {contactForm.formState.errors.phone && <p className="text-red-500 text-xs mt-2 font-medium">{String(contactForm.formState.errors.phone.message)}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Street Address</label>
                  <input {...contactForm.register('addressLine1')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="123 Main St, Apt 4B" />
                  {contactForm.formState.errors.addressLine1 && <p className="text-red-500 text-xs mt-2 font-medium">{String(contactForm.formState.errors.addressLine1.message)}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                  <input {...contactForm.register('city')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="New York" />
                  {contactForm.formState.errors.city && <p className="text-red-500 text-xs mt-2 font-medium">{String(contactForm.formState.errors.city.message)}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">District / State</label>
                  <input {...contactForm.register('district')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="NY" />
                  {contactForm.formState.errors.district && <p className="text-red-500 text-xs mt-2 font-medium">{String(contactForm.formState.errors.district.message)}</p>}
                </div>
              </div>
              <div className="flex justify-between pt-6 mt-6 border-t border-slate-100">
                <button type="button" onClick={onPrevStep} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors">Go Back</button>
                <button type="submit" className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 flex items-center font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  Continue <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Degree Program */}
          {currentStep === 2 && (
            <form onSubmit={degreeForm.handleSubmit(onNextStep)} className="space-y-6">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-semibold text-slate-800 font-['Outfit']">Academic Enrollment</h2>
                <p className="text-xs text-slate-500">Select the primary degree program.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Degree Program</label>
                <div className="relative">
                  <select {...degreeForm.register('degreeProgramId')} className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all outline-none appearance-none text-slate-700 font-medium cursor-pointer">
                    <option value="">-- Choose a program --</option>
                    <option value="1">Software Engineering (SE)</option>
                    <option value="2">Computer Science (CS)</option>
                    <option value="3">Information Technology (IT)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronRight className="rotate-90" size={18} />
                  </div>
                </div>
                {degreeForm.formState.errors.degreeProgramId && <p className="text-red-500 text-xs mt-2 font-medium">{String(degreeForm.formState.errors.degreeProgramId.message)}</p>}
              </div>

              <div className="flex justify-between pt-6 mt-6 border-t border-slate-100">
                <button type="button" onClick={onPrevStep} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors">Go Back</button>
                <button type="submit" className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 flex items-center font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  Review Data <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-semibold text-slate-800 font-['Outfit']">Final Review</h2>
                <p className="text-xs text-slate-500">Please verify all information before submitting.</p>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
                    <p className="font-medium text-slate-900">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Date of Birth</p>
                    <p className="font-medium text-slate-900">{formData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="font-medium text-indigo-600">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                    <p className="font-medium text-slate-900">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Program ID</p>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm font-semibold">{formData.degreeProgramId}</span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Residential Address</p>
                    <p className="font-medium text-slate-900">{formData.addressLine1}, {formData.city}, {formData.district}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6 mt-6 border-t border-slate-100">
                <button type="button" onClick={onPrevStep} disabled={isSubmitting} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors disabled:opacity-50">Make Changes</button>
                <button 
                  onClick={onSubmitFinal}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex items-center font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 size={20} className="animate-spin mr-2" /> : <CheckCircle2 size={20} className="mr-2" />}
                  {isSubmitting ? 'Registering...' : 'Confirm Registration'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
