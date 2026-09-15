import React from 'react';

export default function ShimmerButton({ 
  children = 'Shimmer Button', 
  onClick, 
  className = '', 
  variant = 'emerald', 
  disabled = false
}) {
  
  const gradientColors = {
    emerald: 'transparent 25%, #064e3b, transparent 50%',
    light: 'transparent 25%, #047857, transparent 50%',  
    cyan: 'transparent 25%, #06b6d4, transparent 50%',
    amber: 'transparent 25%, #f59e0b, transparent 50%',
  };

  const activeGradient = gradientColors[variant] || gradientColors.emerald;

  const customCss = `
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

  return (
    <div className={`inline-flex items-center justify-center font-sans ${className}`}>
      <style>{customCss}</style>
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`relative inline-flex items-center justify-center p-[1.5px] bg-slate-200 dark:bg-slate-100 rounded-xl overflow-hidden group shadow-xs transition-transform ${
          disabled ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer active:scale-95'
        }`}
      >
        <div 
          className="absolute inset-0" 
          style={{
            background: `conic-gradient(from var(--angle), ${activeGradient})`,
            animation: 'shimmer-spin 2.5s linear infinite'
          }} 
        />
        <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full h-full px-6 py-2.5 text-slate-800 dark:text-white bg-white dark:bg-slate-800 rounded-[10px] group-hover:bg-slate-50 dark:group-hover:bg-slate-800/90 font-medium text-sm transition-colors duration-300">
          {children}
        </span>
      </button>
    </div>
  );
}