// src/pages/hom/Department.jsx
import React, { useState, useEffect } from 'react';
import { useHOMdashboard } from '../../hooks/hom/useHOMDashboard';
import PeriodFilter from '../../components/UI/PeriodFilter';
import Spinner from '../../components/UI/Spinner';
import { 
  Building2, 
  Users, 
  Search, 
  UserCheck, 
  CheckCircle2, 
  Award,
  Mail
} from 'lucide-react';

const Department = () => {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const [searchTerm, setSearchTerm] = useState('');

  const { 
    permanent_secretary_name, 
    mda_id, 
    selected_period,
    department_rankings, 
    isLoading, 
    error, 
    fetchHOMDashboard 
  } = useHOMdashboard();

  useEffect(() => {
    fetchHOMDashboard({ month: period.month, year: period.year });
  }, [period, fetchHOMDashboard]);

  // Filter department rankings based on search term (Department Name or HOD Name)
  const filteredDepartments = (department_rankings || []).filter((dept) =>
    dept.department_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.hod_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.department_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-12">
      
      {/* Header & Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PeriodFilter 
            month={period.month} 
            year={period.year} 
            onChange={(newPeriod) => setPeriod(newPeriod)} 
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl shadow-sm">
          {error}
        </div>
      )}

      {/* Search & Directory Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative metrics, HOD assignments, and quality indicators across departments.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search department or HOD..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition-all"
            />
          </div>
        </div>

        {/* Loading / Grid Display */}
        {isLoading ? (
          <div className="py-20">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((dept, index) => (
                <div 
                  key={dept.department_id} 
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-4 hover:border-emerald-600/40 transition-colors"
                >
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-emerald-100 text-[#0B5C35] font-semibold text-xs flex items-center justify-center">
                        #{index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{dept.department_name}</h4>
                        <p className="text-[11px] font-mono text-slate-400">{dept.department_id}</p>
                      </div>
                    </div>
                  </div>

                  {/* HOD Details Box */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCheck size={16} className="text-[#0B5C35]" />
                        <span className="font-bold text-slate-700">{dept.hod_name}</span>
                      </div>
                    </div>
                    {dept.hod_email && (
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pl-6 truncate">
                        <Mail size={13} />
                        <span>{dept.hod_email}</span>
                      </div>
                    )}
                  </div>

                  {/* Performance Average Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">Performance Average</span>
                      <span className={`font-semibold ${dept.average_performance >= 75 ? 'text-[#0B5C35]' : 'text-slate-500'}`}>
                        {dept.average_performance}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-[#0B5C35] transition-all duration-500"
                        style={{ width: `${Math.min(dept.average_performance, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Quality & Efficiency Sub-metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/50">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Quality Index</span>
                      <span className="font-semibold text-slate-800">{dept.average_quality}%</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/50">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Efficiency Index</span>
                      <span className="font-semibold text-slate-800">{dept.average_efficiency}%</span>
                    </div>
                  </div>

                  {/* Footer Staff & Task Counters */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1 border-t border-slate-200/50">
                    <span className="flex items-center gap-1">
                      <Users size={14} className="text-slate-400" />
                      Staff Members: <strong className="text-slate-800">{dept.total_staff}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      Completed: <strong className="text-slate-800">{dept.completed_tasks}</strong>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-slate-400 text-xs">
                No matching departments found for your search query.
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
export default Department;