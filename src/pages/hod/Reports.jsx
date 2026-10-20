// src/pages/hod/hodReport.jsx
import React, { useState, useEffect } from 'react';
import { useHodReport } from '../../hooks/hod/useHodReport';
import PeriodFilter from '../../components/UI/PeriodFilter';
import Spinner from '../../components/UI/Spinner';
import {useAuthStore} from '../../store/authStore'
import { 
  Printer, 
  Building2, 
  Award, 
  Users, 
} from 'lucide-react';

export default function HodReport() {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const {profile} = useAuthStore();

  const {
    report_title,
    reporting_scope,
    reporting_period,
    total_staff,
    total_tasks_assigned,
    total_tasks_completed,
    avg_quality,
    avg_efficiency,
    avg_performance,
    staff_roll,
    isLoading,
    error,
    fetchHodReport,
  } = useHodReport();

  useEffect(() => {
    fetchHodReport({ month: period.month, year: period.year });
  }, [period, fetchHodReport]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-12">
      
      {/* Top Header & Export Actions (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 print:hidden">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Department Performance Report
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <PeriodFilter 
            month={period.month} 
            year={period.year} 
            onChange={(newPeriod) => setPeriod(newPeriod)} 
          />

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B5C35] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#09482a] transition-all"
          >
            <Printer size={15} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl shadow-sm print:hidden">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="py-20 print:hidden">
          <Spinner />
        </div>
      ) : (
        /* Printable Document Container */
        <div className="printable-document bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 space-y-8 print:border-none print:shadow-none print:p-0">
          
          {/* Document Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#0B5C35] font-semibold text-xs uppercase tracking-wider">
                <Building2 size={16} />
                <span>Abia State Government · Official Departmental Audit</span>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                {reporting_scope} · {report_title}
              </h2>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-right space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Reporting Period</span>
              <span className="text-xs font-semibold text-slate-900">{reporting_period}</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Department Score</span>
              <span className="text-2xl font-semibold text-[#0B5C35]">{avg_performance}%</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Staff Strength</span>
              <span className="text-2xl font-semibold text-slate-900">{total_staff}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tasks Assigned</span>
              <span className="text-2xl font-semibold text-slate-900">{total_tasks_assigned}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tasks Completed</span>
              <span className="text-2xl font-semibold text-slate-900">{total_tasks_completed}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Task Quality</span>
              <span className="text-xl font-semibold text-slate-700 font-mono">{avg_quality}%</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Task Efficiency</span>
              <span className="text-xl font-semibold text-slate-700 font-mono">{avg_efficiency}%</span>
            </div>
          </div>

          {/* Staff Roll / Department Rosters Table */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users size={16} className="text-[#0B5C35]" />
              <span>Staff Roll Performance Breakdown</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Officer Name</th>
                    <th className="py-3 px-4">Staff ID</th>
                    <th className="py-3 px-4">Assigned</th>
                    <th className="py-3 px-4">Completed</th>
                    <th className="py-3 px-4">Overdue</th>
                    <th className="py-3 px-4">Quality</th>
                    <th className="py-3 px-4">Efficiency</th>
                    <th className="py-3 px-4">Performance</th>
                    <th className="py-3 px-4 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {staff_roll && staff_roll.length > 0 ? (
                    staff_roll.map((staff) => (
                      <tr key={staff.staff_id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{staff.staff_name}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">{staff.staff_id}</td>
                        <td className="py-3.5 px-4">{staff.tasks_assigned}</td>
                        <td className="py-3.5 px-4 text-emerald-700 font-bold">{staff.tasks_completed}</td>
                        <td className="py-3.5 px-4 text-rose-600 font-bold">{staff.tasks_overdue}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {staff.tasks_assigned > 0 ? `${staff.avg_quality}% ` : `0`}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {staff.tasks_assigned > 0 ? `${staff.avg_efficiency}%` : `0`}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#0B5C35]">
                          {staff.avg_performance > 0 ? `${staff.avg_performance}%` : '0%'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            staff.performance_rating === 'Satisfactory' 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}>
                            {staff.performance_rating}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-6 text-slate-400">
                        No staff roll records found for this period.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sign-off Footer */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <p>Generated Via Abia State PMS APP.</p>
              <p className="font-mono text-[10px] text-slate-400 mt-0.5">Timestamp: {new Date().toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="h-8 border-b border-dashed border-slate-300 w-48 mb-1"></div>
              <p className="font-light text-slate-700 text-center">Signature</p>
              <p className="font-semibold text-slate-700 text-center">{profile.fullname}</p>
              <p className="font-normal text-slate-600 text-center">Head of Department</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}