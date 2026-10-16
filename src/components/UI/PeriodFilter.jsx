// src/components/UI/PeriodFilter.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function PeriodFilter({ month, year, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(year || new Date().getFullYear());
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectMonth = (monthIndex) => {
    onChange({ month: monthIndex + 1, year: selectedYear });
    setIsOpen(false);
  };

  const selectedMonthName = MONTHS[(month || new Date().getMonth() + 1) - 1];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0B5C35]/20 transition-all"
      >
        <Calendar size={15} className="text-[#0B5C35]" />
        <span>{selectedMonthName} {year}</span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-4 space-y-3 font-sans">
          {/* Year Navigator Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={() => setSelectedYear((prev) => Math.max(2020, prev - 1))}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-extrabold text-sm text-slate-900">{selectedYear}</span>
            <button
              type="button"
              onClick={() => setSelectedYear((prev) => Math.min(2050, prev + 1))}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Month Selector Grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {MONTHS.map((mName, idx) => {
              const isSelected = month === idx + 1 && year === selectedYear;
              return (
                <button
                  key={mName}
                  type="button"
                  onClick={() => handleSelectMonth(idx)}
                  className={`py-2 text-[11px] font-bold rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#0B5C35] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-[#0B5C35]'
                  }`}
                >
                  {mName.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}