// src/pages/Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  FileText, 
  Award, 
  TrendingUp, 
  Lock 
} from 'lucide-react';
import Logo from '../../../public/pms_logo.jpg';

const HomePage = () => {
  const { isAuthenticated, profile } = useAuthStore();
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  const roleLabel = profile?.pms_role === 'officer' ? 'STAFF' : profile?.pms_role;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Abia State PMS Logo" className="h-12" />
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleDashboardRedirect}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                Dashboard
                <ArrowRight size={16} />
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
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
        <section className="relative bg-gradient-to-b from-white via-emerald-50/30 to-slate-100 py-10 px-6 border-b border-slate-200">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Driving Accountability And <br />
              <span className="text-[#0B5C35]">Excellence in Governance</span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              The centralized digital performance ecosystem for Abia State civil servants, department heads, and executive leadership to log assigned deliverables, monitor weighted scorecards, and audit compliance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleDashboardRedirect}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.98]"
              >
                Access Portal
                <ArrowRight size={18} />
              </button>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                Explore System Modules
              </a>
            </div>
          </div>
        </section>

        {/* Quick Stats / Highlights Bar */}
        <section className="bg-white border-b border-slate-200 py-8 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-[#0B5C35]">100%</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Digital Task Tracking</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900">Multi-Tier</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">HOD & Staff Workflows</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-[#0B5C35]">Weighted</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Performance Grading</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900">Secure</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">State MDA Compliance</p>
            </div>
          </div>
        </section>

        {/* Core Capabilities Section */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">System Capabilities</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Streamlining workflow evaluation across all MDAs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-600/50 ease-in-out duration-500 transition-colors">
              <div className="w-12 h-12 bg-emerald-50 text-[#0B5C35] rounded-xl flex items-center justify-center font-bold">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Real-Time Scorecards</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Track task submissions, efficiency ratios, quality indexes, and six-month performance trends dynamically via Recharts analytics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-600/50 ease-in-out duration-500 transition-colors">
              <div className="w-12 h-12 bg-emerald-50 text-[#0B5C35] rounded-xl flex items-center justify-center font-bold">
                <Users size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Role-Based Clearance</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Tailored interfaces designed explicitly for Staff officers, Department Heads (HOD), and executive administrative supervisors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-600/50 ease-in-out duration-500 transition-colors">
              <div className="w-12 h-12 bg-emerald-50 text-[#0B5C35] rounded-xl flex items-center justify-center font-bold">
                <Building2 size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Statewide Compliance</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Monitor MDA directory rosters, identify task bottlenecks, and maintain strict adherence to civil service administrative guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Overview Section */}
        <section className="bg-slate-100/70 border-y border-slate-200 py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">Structured Task Lifecycle</h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">From assignment to final executive approval</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B5C35] flex items-center justify-center font-bold text-xs">1</div>
                <h4 className="text-sm font-bold text-slate-900">Task Assignment</h4>
                <p className="text-xs text-slate-500 leading-relaxed">HODs assign tasks with specific weights (Low, Medium, High, Critical) and deadlines.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B5C35] flex items-center justify-center font-bold text-xs">2</div>
                <h4 className="text-sm font-bold text-slate-900">Officer Execution</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Staff officers review active assignments, attach deliverables, and submit for evaluation.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B5C35] flex items-center justify-center font-bold text-xs">3</div>
                <h4 className="text-sm font-bold text-slate-900">Review & Grading</h4>
                <p className="text-xs text-slate-500 leading-relaxed">HODs evaluate submissions, grade quality/efficiency, or request revisions if needed.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B5C35] flex items-center justify-center font-bold text-xs">4</div>
                <h4 className="text-sm font-bold text-slate-900">Scorecard Update</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Approved ratings automatically update officer KPIs and six-month performance trends.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Authentication Banner */}
        <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-[#0B5C35] mb-2">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">Secure Authorized Access</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            This portal is restricted to accredited Abia State Civil Service personnel. Sign in with your official credentials to access your designated workspace.
          </p>
          <div>
            <button
              onClick={handleDashboardRedirect}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md"
            >
              Sign In to Portal
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Abia State Government. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-800 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer">Support Desk</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;