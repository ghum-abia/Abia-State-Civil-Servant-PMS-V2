// src/pages/hom/Report.jsx
import React, { useState, useEffect } from 'react';
import { useHomReport } from '../../hooks/hom/useHomReport';
import PeriodFilter from '../../components/UI/PeriodFilter';
import Spinner from '../../components/UI/Spinner';
import { useAuthStore } from '../../store/authStore'

import {
  Printer,
  Building,
  Users,
  Award,
  Layers
} from 'lucide-react';

export default function Report() {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const { profile } = useAuthStore();

  const {
    report_title,
    reporting_scope,
    reporting_period,
    total_staff,
    total_tasks_assigned,
    total_tasks_completed,
    total_tasks_overdue,
    avg_quality,
    avg_efficiency,
    avg_performance,
    unit_summaries,
    staff_roll,
    isLoading,
    error,
    fetchHomReport,
  } = useHomReport();

  useEffect(() => {
    fetchHomReport({ month: period.month, year: period.year });
  }, [period, fetchHomReport]);

  const handlePrint = () => {
    window.print();
  };

  // Group staff members by department field
  const staffByDepartment = staff_roll.reduce((acc, staff) => {
    const dept = staff.department || 'General';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(staff);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-12">

      {/* Top Header & Export Actions (Hidden on Print) */}
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
        /* Printable Report Document Card */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 space-y-8 print:border-none print:shadow-none print:p-0">

          {/* Report Document Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#0B5C35] font-semibold text-xs uppercase tracking-wider">
                <Building size={16} />
                <span>Abia State Government · Official Performance Audit</span>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                {reporting_scope} · {report_title}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Head of Ministry Executive Review
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-right space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Evaluation Cycle</span>
              <span className="text-xs font-semibold text-slate-900">{reporting_period}</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Average</span>
              <span className="text-2xl font-semibold text-[#0B5C35]">{avg_performance}%</span>
              <br /><span className="text-[11px] font-semibold text-[#aac1b6]">Accross MDA</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Staff</span>
              <span className="text-2xl font-semibold text-slate-900">{total_staff}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">TotalTasks Assigned</span>
              <span className="text-2xl font-semibold text-slate-900">{total_tasks_assigned}</span>
              <br /><span className="text-[11px] font-semibold text-[#aac1b6]">This month</span>

            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Tasks Completed</span>
              <span className="text-2xl font-semibold text-slate-900">{total_tasks_completed}</span>
              <br /><span className="text-[11px] font-semibold text-[#aac1b6]">Accross MDA</span>

            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Task Quality</span>
              <span className="text-xl font-semibold text-slate-700 font-mono">{avg_quality}%</span>
              <br /><span className="text-[11px] font-semibold text-[#aac1b6]">Accross MDA</span>

            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Task Efficiency</span>
              <span className="text-xl font-semibold text-slate-700 font-mono">{avg_efficiency}%</span>
              <br /><span className="text-[11px] font-semibold text-[#aac1b6]">Accross MDA</span>

            </div>
          </div>

          {/* Unit Summaries Overview Cards */}
          {unit_summaries.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} className="text-[#0B5C35]" />
                <span>Department Unit Summaries</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {unit_summaries.map((unit, idx) => (
                  <div key={idx} className="p-4 bg-slate-50/70 border border-slate-200/60 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{unit.unit_name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Total Staff: <strong className="text-slate-700">{unit.total_staff}</strong> | Completed Task: <strong className="text-slate-700">{unit.completed_tasks}</strong></p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-[#0B5C35]">{unit.avg_performance}%</span>
                      <span className="text-[10px] block text-slate-400 font-semibold uppercase">Avg Score</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Departmental Staff Roll Breakdowns */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users size={16} className="text-[#0B5C35]" />
              <span>Staff Roll Grouped by Department</span>
            </h3>

            {Object.keys(staffByDepartment).map((deptName) => (
              <div key={deptName} className="space-y-3 border border-slate-200/80 rounded-xl p-4 bg-slate-50/30">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-semibold uppercase text-[#0B5C35] tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0B5C35]"></span>
                    {deptName} Department
                  </h4>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {staffByDepartment[deptName].length} Personnel
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100/70 text-[10px] font-bold text-slate-400 uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Officer Name</th>
                        <th className="py-2.5 px-3">Staff ID</th>
                        <th className="py-2.5 px-3">Assigned</th>
                        <th className="py-2.5 px-3">Completed</th>
                        <th className="py-2.5 px-3">Overdue</th>
                        <th className="py-2.5 px-3">Quality</th>
                        <th className="py-2.5 px-3">Efficiency</th>
                        <th className="py-2.5 px-3">Performance</th>
                        <th className="py-2.5 px-3 text-center">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {staffByDepartment[deptName].map((staff) => (
                        <tr key={staff.staff_id} className="hover:bg-white transition-colors">
                          <td className="py-3 px-3 font-bold text-slate-900">{staff.staff_name}</td>
                          <td className="py-3 px-3 font-mono text-slate-500">{staff.staff_id}</td>
                          <td className="py-3 px-3">{staff.tasks_assigned}</td>
                          <td className="py-3 px-3 text-emerald-700 font-bold">{staff.tasks_completed}</td>
                          <td className="py-3 px-3 text-rose-600 font-bold">{staff.tasks_overdue}</td>
                          <td className="py-3 px-3 font-mono text-slate-600">
                            {staff.tasks_assigned > 0 ? `${staff.avg_quality}%` : '0'}
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-600">
                            {staff.tasks_assigned > 0 ? `${staff.avg_efficiency}%` : '0'}
                          </td>
                          <td className="py-3 px-3 font-semibold text-[#0B5C35]">
                            {staff.avg_performance > 0 ? `${staff.avg_performance}%` : '0%'}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${staff.performance_rating === 'Satisfactory'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                              }`}>
                              {staff.performance_rating}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Sign-off / Footer note */}
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