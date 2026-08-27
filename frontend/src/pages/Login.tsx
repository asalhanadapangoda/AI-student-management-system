import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { GraduationCap, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      const response = await api.post('/auth/login', data);
      const { token, adminId, name, role } = response.data;
      
      login(token, { adminId, name, role });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials or server error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 z-0"></div>
        
        {/* Animated glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 flex flex-col justify-center items-start px-20 text-white w-full h-full">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl mb-8 border border-white/10 animate-float">
            <GraduationCap size={48} className="text-indigo-400" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 font-['Outfit']">
            Manage your <br/>
            <span className="text-gradient-white">institution</span> with ease.
          </h1>
          <p className="text-lg text-slate-300 max-w-md font-light leading-relaxed">
            The next-generation student management platform. Experience blazing fast performance, secure role-based access, and deep insights.
          </p>
          
          <div className="mt-12 flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
            <ShieldCheck size={20} className="text-emerald-400" />
            <span className="text-sm font-medium text-slate-200">Enterprise Grade Security</span>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-[480px] xl:w-[540px] lg:px-20 relative bg-white shadow-2xl z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96 animate-slide-in">
          <div className="lg:hidden flex justify-center text-indigo-600 mb-8">
            <GraduationCap size={48} />
          </div>
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 font-['Outfit'] flex items-center justify-center lg:justify-start">
              Welcome back <Sparkles size={24} className="ml-2 text-indigo-500" />
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Please enter your admin credentials to continue.
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md animate-slide-in">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700">Email address</label>
                <div className="mt-2">
                  <input
                    {...register('email')}
                    type="email"
                    className={`block w-full px-4 py-3 bg-slate-50 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white'} rounded-xl shadow-sm placeholder-slate-400 sm:text-sm transition-all duration-200 outline-none`}
                    placeholder="admin@example.com"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600 animate-slide-in">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="mt-2">
                  <input
                    {...register('password')}
                    type="password"
                    className={`block w-full px-4 py-3 bg-slate-50 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white'} rounded-xl shadow-sm placeholder-slate-400 sm:text-sm transition-all duration-200 outline-none`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-2 text-sm text-red-600 animate-slide-in">{errors.password.message}</p>}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transform transition-all duration-200 hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  ) : null}
                  {isSubmitting ? 'Authenticating...' : 'Sign in securely'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
