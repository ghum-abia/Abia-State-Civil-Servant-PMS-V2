// src/pages/hos/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useHosDashboard } from '../../hooks/hos/useHosDashboard';
import PeriodFilter from '../../components/UI/PeriodFilter';
import Spinner from '../../components/UI/Spinner';
import { 
  Building2, 
  Users, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function HosDashboard() {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const {
    state_performance_index,
    selected_period,
    total_active_staff,
    total_tasks_created,
    total_tasks_completed,
    total_tasks_overdue,
    state_completion_rate,
    mda_rankings,
    isLoading,
    error,
    fetchHosDashboard,
  } = useHosDashboard();

  useEffect(() => {
    fetchHosDashboard({ month: period.month, year: period.year });
  }, [period, fetchHosDashboard]);

  // Mock Trend data for visual chart parity with design spec
  const trendData = [
    { month: 'Apr', score: 80 },
    { month: 'May', score: 83 },
    { month: 'Jun', score: 81 },
    { month: 'Jul', score: 85 },
    { month: 'Aug', score: 84 },
    { month: 'Sep', score: state_performance_index || 86 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-12">
      
      {/* Top Header & Integrated Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            State Civil Service Performance
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Abia State Government · Head of Service Executive Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PeriodFilter 
            month={period.month} 
            year={period.year} 
            onChange={(newPeriod) => setPeriod(newPeriod)} 
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="py-20">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Top 4 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Overall State Performance */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                Overall State Performance
              </span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-semibold text-[#0B5C35]">
                  {state_performance_index}%
                </h3>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp size={12} /> Active Cycle
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">State-wide index average</p>
            </div>

            {/* Card 2: MDAs */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                Monitored MDAs
              </span>
              <h3 className="text-3xl font-semibold text-slate-900">
                {mda_rankings.length}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">Ministries, Depts & Agencies</p>
            </div>

            {/* Card 3: Staff Strength */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                Active Personnel
              </span>
              <h3 className="text-3xl font-semibold text-slate-900">
                {total_active_staff}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">Active civil servants</p>
            </div>

            {/* Card 4: Completion Rate */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                Completion Rate
              </span>
              <h3 className="text-3xl font-semibold text-emerald-800">
                {state_completion_rate}%
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {total_tasks_completed} of {total_tasks_created} tasks completed
              </p>
            </div>

          </div>

          {/* Trend & Performance Alerts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* State Performance Trend Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                    State Performance Trend
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Historical progress tracking</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                  {selected_period}
                </span>
              </div>

              <div className="h-48 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="stateGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0B5C35" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#0B5C35" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis domain={[50, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Tooltip formatter={(val) => [`${val}%`, 'State Performance']} />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#0B5C35"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#stateGradient)"
                      dot={{ fill: '#0B5C35', r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Alerts Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Performance Alerts
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-rose-500 text-white font-semibold text-xs flex items-center justify-center">
                      {total_tasks_overdue}
                    </span>
                    <span className="text-xs font-bold text-rose-900">Tasks Overdue</span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-600 bg-white px-2 py-0.5 rounded border border-rose-200">Attention</span>
                </div>

                <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-semibold text-xs flex items-center justify-center">
                      {mda_rankings.filter(m => m.average_performance < 50).length}
                    </span>
                    <span className="text-xs font-bold text-amber-900">MDAs Below Target</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 bg-white px-2 py-0.5 rounded border border-amber-200">Review</span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#0B5C35] text-white font-semibold text-xs flex items-center justify-center">
                      {mda_rankings.filter(m => m.average_performance >= 70).length}
                    </span>
                    <span className="text-xs font-bold text-emerald-900">Optimal MDAs</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">On Track</span>
                </div>
              </div>
            </div>

          </div>

          {/* MDA Performance Ranking Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award size={16} className="text-[#0B5C35]" />
                <span>MDA Performance Ranking ({selected_period})</span>
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">MDA Identifier</th>
                    <th className="py-3 px-4">Staff Count</th>
                    <th className="py-3 px-4">Completed Tasks</th>
                    <th className="py-3 px-4">Performance Index</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {mda_rankings && mda_rankings.length > 0 ? (
                    mda_rankings.map((mda, index) => (
                      <tr key={mda.mda_id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 font-semibold">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                            index === 0 ? 'bg-amber-400 text-slate-900 font-semibold' :
                            index === 1 ? 'bg-slate-200 text-slate-800' :
                            index === 2 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{mda.mda_id}</td>
                        <td className="py-3.5 px-4">{mda.total_staff}</td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-800">{mda.completed_tasks}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#0B5C35]">
                          {mda.average_performance}%
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            mda.average_performance >= 70 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : mda.average_performance > 0 
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}>
                            {mda.average_performance >= 70 ? 'On Track' : mda.average_performance > 0 ? 'At Risk' : 'No Activity'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-slate-400">
                        No MDA ranking data available for this cycle.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

    </div>
  );
}