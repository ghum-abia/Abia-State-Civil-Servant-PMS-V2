import React from 'react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Unauthorized() {
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  // Helper function to send profiles back to their appropriate dashboard branch
  const handleGoHome = () => {
    if (!profile) {
      navigate('/login');
      return;
    }
    
    switch (profile.pms_role) {
      case 'staff':
        navigate('/staff/dashboard');
        break;
      case 'supervisor':
        navigate('/supervisor/dashboard');
        break;
      case 'governor':
      case 'hos':
        navigate('/executive/dashboard');
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center"
      >
        {/* Warning Icon Badge */}
        <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500 shadow-sm">
          <ShieldAlert size={32} strokeWidth={2} />
        </div>

        {/* Error Code & Status Heading */}
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
          403
        </h1>
        <h2 className="text-xl font-bold text-[#0A2342] tracking-wide mb-3">
          Access Denied
        </h2>

        {/* Descriptive Message */}
        <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto leading-relaxed mb-8">
          Your account permissions do not allow access to this clearance level. Please contact your system administrator if you believe this is an error.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          {/* Go Back (Browser History step) */}
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-slate-700 rounded-xl font-bold text-xs transition-all shadow-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          {/* Smart Redirect Button */}
          <button
            onClick={handleGoHome}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0A2342] hover:bg-[#15345a] active:scale-[0.98] text-white rounded-xl font-bold text-xs transition-all shadow-md"
          >
            <Home size={16} />
            My Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}