import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Building2, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const  Login = () => {
  const [nin, setNin] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex w-full bg-white text-slate-900">
      {/* Left Panel - Abia State Green Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0B5C35] flex-col justify-between p-12 text-white relative overflow-hidden">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Civil Service PMS</h1>
              <p className="text-xs text-emerald-100/80">Abia State Government</p>
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-extrabold tracking-tight leading-snug mb-4">
              One platform for measuring civil service performance.
            </h2>
            <p className="text-emerald-100/90 text-sm leading-relaxed mb-8">
              Track objectives, manage tasks, review performance, and drive accountability across all ministries, departments, and agencies.
            </p>
          </div>

          <div className="space-y-3 max-w-sm">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-emerald-50">
                <CheckCircle2 size={16} className="text-emerald-300 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-emerald-200/60 pt-6 border-t border-emerald-800/60">
          © {new Date().getFullYear()} Abia State Government. All rights reserved. Developed by the Office of the Head of Service.
        </div>
      </div>

      {/* Right Panel - NIN Sign In Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 bg-white">
        <div className="max-w-md w-full">
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 mb-4 border border-emerald-100">
              <ShieldCheck size={22} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Sign in with NIN</h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your National Identification Number to access your portal.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                National Identification Number (NIN) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={11}
                value={nin}
                onChange={(e) => setNin(e.target.value)}
                placeholder="Enter 11-digit NIN"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600 transition-all font-mono tracking-wider"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#0B5C35] hover:bg-[#09482b] active:bg-[#073621] text-white font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-400">
            Authorized personnel only. All access is logged and monitored.
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;