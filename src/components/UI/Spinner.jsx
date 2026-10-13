// src/components/common/Spinner.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm min-h-screen w-full gap-3">
      <div className="w-12 h-12 flex items-center justify-center animate-spin text-[#0B5C35]">
        <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"/>
        </svg>
      </div>
      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider animate-pulse">Fetching data...</span>
    </div>
  );
};

export default Loader;