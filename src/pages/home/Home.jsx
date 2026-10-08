import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ShieldCheck, BarChart3, Users, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

const HomePage =()=> {
  const { isAuthenticated, profile } = useAuthStore();
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white font-bold text-lg rounded-xl w-10 h-10 flex items-center justify-center shadow-sm">
              CS
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-sm tracking-wide uppercase">Abia State Government</h1>
              <p className="text-xs text-slate-500 font-medium">Performance Management System V2</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleDashboardRedirect}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-sm"
              >
                Go to Dashboard ({profile?.role?.toUpperCase() || 'Portal'})
                <ArrowRight size={16} />
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-sm"
              >
                Sign In
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-white to-slate-100 py-20 px-6 border-b border-slate-200">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase">
              <ShieldCheck size={14} /> Official Civil Service Portal
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Driving Accountability & <br />
              <span className="text-blue-600">Excellence in Governance</span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              The centralized digital performance platform for Abia State civil servants, department heads, and executive leadership to log tasks, monitor scorecards, and audit compliance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleDashboardRedirect}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98]"
              >
                Access Portal Space
                <ArrowRight size={18} />
              </button>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-all shadow-sm"
              >
                Explore Features
              </a>
            </div>
          </div>
        </section>

        {/* Features / Pillars Section */}
        <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">System Capabilities</h2>
            <p className="text-sm text-slate-500 font-medium">Streamlining workflow evaluation across all MDAs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Real-Time Scorecards</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Track daily task submissions, operational metrics, and performance indexes dynamically across all officer tiers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                <profiles size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Role-Based Clearance</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Tailored interfaces designed explicitly for Officers, HODs, Ministry Directors (HOM), and the Head of Service (HOS).
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                <Building2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Statewide Compliance</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Monitor MDA-wide activity logs, identify administrative bottlenecks, and generate comprehensive compliance reports.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Abia State Government. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-800 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-800 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-800 transition-colors">Support Desk</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;