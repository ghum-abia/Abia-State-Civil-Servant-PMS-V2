// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Building2, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [nin, setNin] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleNinChange = (e) => {
    // Strip out any non-digit characters using regex so letters cannot be typed
    const numericValue = e.target.value.replace(/\D/g, '');
    setNin(numericValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    try {
      // Payload matches backend requirement: { nin: "string" }
      await login({ nin });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // Error handled by Zustand store
    }
  };

  const features = [
    'Objective-to-performance traceability',
    'Real-time task and submission tracking',
    'Automated performance scoring engine',
    'KPI dashboards for all role levels',
    'Statewide performance intelligence'
  ];

  return (
    <div className="min-h-screen flex w-full bg-white text-slate-900 overflow-hidden">
      {/* Left Panel - Animated Abia State Green Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0B5C35] flex-col justify-between p-12 text-white relative overflow-hidden">
        
        {/* Animated Background Decorative Elements / Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-700/30 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12 animate-fade-in">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Civil Service PMS</h1>
              <p className="text-xs text-emerald-100/80">Abia State Government</p>
            </div>
          </div>

          <div className="max-w-md space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight leading-snug animate-slide-up">
              One platform for measuring civil service performance.
            </h2>
            <p className="text-emerald-100/90 text-sm leading-relaxed">
              Track objectives, manage tasks, review performance, and drive accountability across all ministries, departments, and agencies.
            </p>
          </div>

          <div className="space-y-3 max-w-sm mt-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 text-xs text-emerald-50 transition-transform duration-300 hover:translate-x-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600/60 flex items-center justify-center shrink-0 border border-emerald-400/30 shadow-sm">
                  <CheckCircle2 size={13} className="text-emerald-200" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-emerald-200/60 pt-6 border-t border-emerald-800/60 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Abia State Government. All rights reserved.</span>
          <span className="font-medium text-emerald-200/80">HOS Office</span>
        </div>
      </div>

      {/* Right Panel - NIN Sign In Form with Mobile Watermark Logo */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-white relative overflow-hidden">
        
        {/* Mobile Watermark Logo Background (Visible ONLY on mobile/tablet viewports) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none lg:hidden">
          <img 
            src="/abia.png" 
            alt="Abia State Watermark" 
            className="w-[320px] sm:w-[400px] opacity-[0.06] object-contain"
          />
        </div>

        <div className="max-w-md w-full relative z-10">
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 mb-4 border border-emerald-100 shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Sign in with NIN</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Enter your National Identification Number to securely access your portal.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm px-4 py-3 rounded-xl shadow-sm animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                National Identification Number (NIN) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={11}
                value={nin}
                onChange={handleNinChange}
                placeholder="Enter 11-digit NIN"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all font-mono tracking-widest shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#0B5C35] hover:bg-[#09482b] active:bg-[#073621] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/15 disabled:opacity-50 disabled:cursor-not-allowed text-sm transform active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Authenticating...
                </>
              ) : (
                'Sign In to Portal'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[11px] sm:text-xs text-slate-400 border-t border-slate-100 pt-6">
            Authorized personnel only. All access logs and activities are monitored.
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;