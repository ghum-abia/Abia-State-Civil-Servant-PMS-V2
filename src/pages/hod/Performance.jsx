// src/pages/hod/Performance.jsx
import React, { useEffect } from 'react';
import { useHodDashboard } from '../../hooks/hod/useHodDashboard';
import HodPerformanceTrend from '../../components/hod/HodPerformanceTrend';
import HodPieChart from '../../components/hod/HodPieChart';
import HodBarChart from '../../components/hod/HodBarChart';
import { Loader2, AlertCircle } from 'lucide-react';
import Spinner from '../../components/UI/Spinner';

export default function PerformancePage() {
  const { hodData, isLoading, error, fetchHodDashboard } = useHodDashboard();

  useEffect(() => {
    fetchHodDashboard();
  }, [fetchHodDashboard]);

  if (isLoading) return <Spinner />

  const {
    team_performance_average = 84,
    team_leaderboard = [],
    six_month_trend = [],
  } = hodData || {};

  // Mock staff ranking list matching UI
  const staffRankings = team_leaderboard.length > 0 ? team_leaderboard : [
    { officer_id: '1', officer_name: 'Grace Okoro', title: 'Principal Administrative Officer', average_performance: 91, status: 'Excellent', color: '#0B5C35' },
    { officer_id: '2', officer_name: 'Mary James', title: 'Senior Administrative Officer', average_performance: 88, status: 'Excellent', color: '#0B5C35' },
    { officer_id: '3', officer_name: 'John Doe', title: 'Administrative Officer I', average_performance: 82, status: 'Very Good', color: '#2563EB' },
    { officer_id: '4', officer_name: 'Peter Smith', title: 'Administrative Officer II', average_performance: 74, status: 'Satisfactory', color: '#DC2626' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-12 text-slate-800">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Team Performance</h2>
        <p className="text-xs text-slate-500 mt-0.5">Dashboard / Team Performance</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Team Performance</p>
          <h3 className="text-3xl font-semibold text-[#0B5C35] mt-1">{team_performance_average}%</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Administration Dept.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Quality</p>
          <h3 className="text-3xl font-semibold text-blue-600 mt-1">82%</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Task quality score</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Efficiency</p>
          <h3 className="text-3xl font-semibold text-[#0B5C35] mt-1">87%</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Submission & timeline</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">KPI Achievement</p>
          <h3 className="text-3xl font-semibold text-[#0B5C35] mt-1">86%</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Target: 90%</p>
        </div>
      </div>

      {/* Row 2: Trend Line & Pie Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <HodPerformanceTrend trendData={six_month_trend} />
        </div>
        <div>
          <HodPieChart />
        </div>
      </div>

      {/* Row 3: Staff Performance Ranking */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
          Staff Performance Ranking
        </h3>

        <div className="space-y-4">
          {staffRankings.map((staff, index) => (
            <div key={staff.officer_id} className="flex items-center gap-4 text-xs font-semibold">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                {index + 1}
              </span>

              <div className="w-36 shrink-0">
                <p className="font-bold text-slate-900 leading-tight">{staff.officer_name}</p>
                <p className="text-[10px] text-slate-400 font-medium truncate">{staff.title || 'Officer'}</p>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${staff.average_performance}%`,
                    backgroundColor: staff.color || '#0B5C35',
                  }}
                />
              </div>

              <span className="w-10 text-right font-semibold text-slate-800">{staff.average_performance}%</span>

              <span
                className={`px-3 py-1 rounded-md text-[10px] font-bold shrink-0 ${
                  staff.status === 'Excellent'
                    ? 'bg-emerald-50 text-emerald-700'
                    : staff.status === 'Very Good'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {staff.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4: Department Comparison Bar Chart */}
      <div>
        <HodBarChart />
      </div>
    </div>
  );
}