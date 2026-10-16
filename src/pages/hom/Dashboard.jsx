// src/pages/hom/HOMDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useHOMdashboard } from '../../hooks/hom/useHOMDashboard';
import PeriodFilter from '../../components/UI/PeriodFilter';
import Spinner from '../../components/UI/Spinner';
import DepartmentComparisonBar from '../../components/hom/DepartmentComparisonBar';
import { 
  Building2, 
  Award,
  UserCheck
} from 'lucide-react';

const HOMDashboard = () => {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const { 
    permanent_secretary_name, 
    mda_id, 
    selected_period,
    mda_performance_average, 
    total_mda_staff, 
    total_tasks_created, 
    total_tasks_completed, 
    total_tasks_overdue, 
    pending_reviews_count, 
    department_rankings, 
    isLoading, 
    error, 
    fetchHOMDashboard 
  } = useHOMdashboard();

  // Re-fetch dashboard whenever month/year state updates
  useEffect(() => {
    fetchHOMDashboard({ month: period.month, year: period.year });
  }, [period, fetchHOMDashboard]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-12">
      
      {/* Header & Integrated Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            {permanent_secretary_name || 'Executive Office'}
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            MDA ID: <span className="font-mono text-slate-700">{mda_id || 'MDA'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Reusable Calendar Month/Year Filter Component */}
          <PeriodFilter 
            month={period.month} 
            year={period.year} 
            onChange={handlePeriodChange} 
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl shadow-sm">
          {error}
        </div>
      )}

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-20">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Top 5 Metrics Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">MDA Performance</p>
              <h2 className="text-3xl font-semibold text-[#0B5C35]">{mda_performance_average}%</h2>
              <p className="text-xs font-medium text-slate-400 pt-1">{selected_period || 'Selected Month'}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Staff</p>
              <h2 className="text-3xl font-semibold text-slate-900">{total_mda_staff}</h2>
              <p className="text-xs font-medium text-slate-400 pt-1">Registered personnel</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tasks Completed</p>
              <h2 className="text-3xl font-semibold text-slate-900">{total_tasks_completed}</h2>
              <p className="text-xs font-medium text-slate-400 pt-1">Successfully delivered</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Reviews</p>
              <h2 className="text-3xl font-semibold text-amber-600">{pending_reviews_count}</h2>
              <p className="text-xs font-medium text-slate-400 pt-1">Awaiting sign-off</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overdue Tasks</p>
              <h2 className="text-3xl font-semibold text-rose-600">{total_tasks_overdue}</h2>
              <p className="text-xs font-medium text-slate-400 pt-1">Requires intervention</p>
            </div>
          </div>

          {/* Department Rankings Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Department Rankings
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evaluation for <strong className="text-slate-800">{selected_period}</strong>
                </p>
              </div>
              <Award size={22} className="text-[#0B5C35]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {department_rankings && department_rankings.length > 0 ? (
                department_rankings.map((dept, index) => (
                  <div 
                    key={dept.department_id} 
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-4 hover:border-emerald-600/40 transition-colors"
                  >
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
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        dept.status_flag === 'Satisfactory' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {dept.status_flag}
                      </span>
                    </div>

                    {/* HOD Details */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <UserCheck size={16} className="text-[#0B5C35]" />
                        <span className="font-bold text-slate-700">{dept.hod_name}</span>
                      </div>
                      {dept.hod_email && (
                        <span className="text-slate-400 text-[11px] truncate max-w-[180px]">{dept.hod_email}</span>
                      )}
                    </div>

                    {/* Performance Progress */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-600">Performance Average</span>
                        <span className={`font-semibold ${dept.average_performance >= 75 ? 'text-[#0B5C35]' : 'text-amber-600'}`}>
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
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Department Task Quality</span>
                        <span className="font-semibold text-slate-800">{dept.average_quality}%</span>
                      </div>
                      <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/50">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Department Task Efficiency</span>
                        <span className="font-semibold text-slate-800">{dept.average_efficiency}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1 border-t border-slate-200/50">
                      <span>Total Staff: <strong className="text-slate-800">{dept.total_staff}</strong></span>
                      <span>Completed Tasks: <strong className="text-slate-800">{dept.completed_tasks}</strong></span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-slate-400 text-xs">
                  No department rankings recorded for this evaluation period.
                </div>
              )}
            </div>
          </div>

          <DepartmentComparisonBar data={department_rankings} />
        </>
      )}

    </div>
  );
};

export default HOMDashboard;