// src/pages/staff/Reports.jsx
import React, { useState, useEffect } from 'react';
import { useOfficerDashboard } from '../../hooks/staff/useOfficerDashboard';
import { useStaffPerformance } from '../../hooks/staff/useStaffPerformance';
import PeriodFilter from '../../components/UI/PeriodFilter';
import OfficerPerformanceTrend from '../../components/staff/OfficerPerformanceTrend';
import Spinner from '../../components/UI/Spinner';
import { 
  Printer, 
  Award, 
} from 'lucide-react';

export default function Reports() {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const { dashboardData, fetchDashboardData, isLoading, error } = useOfficerDashboard();
  const { scorecard, fetchMyScorecard } = useStaffPerformance();

  useEffect(() => {
    fetchDashboardData({ month: period.month, year: period.year });
    fetchMyScorecard();
  }, [period, fetchDashboardData, fetchMyScorecard]);

  const sixMonthTrend = dashboardData?.six_month_trend || [];
  const officerName = dashboardData?.officer_name || 'Staff Officer';
  const kpiScore = dashboardData?.kpi_performance_score || 0;
  const completedTasks = dashboardData?.completed_tasks || 0;
  const activeTasks = dashboardData?.active_tasks || 0;
  const overdueTasks = dashboardData?.overdue_tasks || 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-12">
      
      {/* Top Header & Actions (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between/ print:hidden">
        <div>
          <p className="text-xs font-semibold text-slate-500">
            Review historical performance metrics and progress.
          </p>
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
          
          {/* Official Document Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#0B5C35] font-semibold text-xs uppercase tracking-wider">
                <Award size={16} />
                <span>Abia State Government · Officer Evaluation Report</span>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                Performance Audit Summary
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Officer Name: <strong className="text-slate-800">{officerName}</strong>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-right space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Evaluation Cycle</span>
              <span className="text-xs font-semibold text-slate-900">
                {period.month}/{period.year}
              </span>
            </div>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">KPI Score</span>
              <span className="text-2xl font-semibold text-[#0B5C35]">{kpiScore}%</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Tasks</span>
              <span className="text-2xl font-semibold text-slate-900">{completedTasks}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Tasks</span>
              <span className="text-2xl font-semibold text-blue-600">{activeTasks}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overdue Tasks</span>
              <span className="text-2xl font-semibold text-rose-600">{overdueTasks}</span>
            </div>
          </div>

          {/* Historical Performance Trend Chart Section */}
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              6-Month Performance Trend History
            </h3>
            <div className="pt-2">
              <OfficerPerformanceTrend trendData={sixMonthTrend} />
            </div>
          </div>

          {/* Document Sign-off Footer */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <p>Generated automatically via Abia State PMS Version 2.</p>
              <p className="font-mono text-[10px] text-slate-400 mt-0.5">Timestamp: {new Date().toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="h-8 border-b border-dashed border-slate-300 w-48 mb-1"></div>
              <p className="font-bold text-slate-700">Officer Signature</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}