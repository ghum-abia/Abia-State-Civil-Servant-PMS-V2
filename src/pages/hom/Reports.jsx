// src/pages/hom/Report.jsx
import React, { useState, useEffect } from 'react';
import { useHOMdashboard } from '../../hooks/hom/useHOMDashboard';
import PeriodFilter from '../../components/UI/PeriodFilter';
import DepartmentComparisonChart from '../../components/hom/DepartmentComparisonBar';
import Spinner from '../../components/UI/Spinner';
import { 
  FileText, 
  Download, 
  Printer, 
  Building2, 
  Award, 
  CheckCircle2, 
  Users, 
  Calendar 
} from 'lucide-react';

export default function Report() {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const { 
    homData,
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

  useEffect(() => {
    fetchHOMDashboard({ month: period.month, year: period.year });
  }, [period, fetchHOMDashboard]);

  const handlePrintOrExport = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-12">
      
      {/* Top Header & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-xs font-semibold text-slate-600 mt-0.5">
            Ministry-wide official audit and evaluation report
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <PeriodFilter 
            month={period.month} 
            year={period.year} 
            onChange={(newPeriod) => setPeriod(newPeriod)} 
          />

          <button
            onClick={handlePrintOrExport}
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
        /* Printable Report Document Card */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 space-y-8 print:border-none print:shadow-none print:p-0">
          
          {/* Report Document Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#0B5C35] font-semibold text-xs uppercase tracking-wider">
                <Building2 size={16} />
                <span>Abia State Government · Official Performance Audit</span>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                {mda_id || 'MDA-FINANCE'} Performance Summary
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Head of Ministry: <strong className="text-slate-800">{permanent_secretary_name || 'Executive Office'}</strong>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-right space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Evaluation Cycle</span>
              <span className="text-xs font-semibold text-slate-900">{selected_period || 'Current Period'}</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Average</span>
              <span className="text-2xl font-semibold text-[#0B5C35]">{mda_performance_average}%</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Staff</span>
              <span className="text-2xl font-semibold text-slate-900">{total_mda_staff}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tasks Completed</span>
              <span className="text-2xl font-semibold text-slate-900">{total_tasks_completed}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending Reviews</span>
              <span className="text-2xl font-semibold text-amber-600">{pending_reviews_count}</span>
            </div>
          </div>

          {/* Departmental Performance Comparison Bar Chart */}
          <div className="space-y-4 pt-2">
            <DepartmentComparisonChart 
              data={department_rankings} 
              title="DEPARTMENTAL PERFORMANCE COMPARISON" 
            />
          </div>

          {/* Departmental Breakdown Table */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Award size={16} className="text-[#0B5C35]" />
              <span>Departmental Rankings & Detailed Metrics</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Assigned HOD</th>
                    <th className="py-3 px-4">Staff Strength</th>
                    <th className="py-3 px-4">Tasks Completed</th>
                    <th className="py-3 px-4">Quality / Efficiency</th>
                    <th className="py-3 px-4">Average</th>
                    <th className="py-3 px-4 text-right">Status Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {department_rankings && department_rankings.length > 0 ? (
                    department_rankings.map((dept) => (
                      <tr key={dept.department_id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {dept.department_name}
                          <span className="block text-[10px] font-mono text-slate-400">{dept.department_id}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {dept.hod_name}
                          {dept.hod_email && <span className="block text-[10px] text-slate-400">{dept.hod_email}</span>}
                        </td>
                        <td className="py-3.5 px-4">{dept.total_staff}</td>
                        <td className="py-3.5 px-4">{dept.completed_tasks}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          Q: {dept.average_quality}% | E: {dept.average_efficiency}%
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#0B5C35]">
                          {dept.average_performance}%
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {dept.status_flag}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-slate-400">
                        No department records available for this reporting period.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sign-off / Footer note */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <p>Generated automatically via Abia State PMS Version 2.</p>
              <p className="font-mono text-[10px] text-slate-400 mt-0.5">Timestamp: {new Date().toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="h-8 border-b border-dashed border-slate-300 w-48 mb-1"></div>
              <p className="font-bold text-slate-700">Permanent Secretary / HOM Signature</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}