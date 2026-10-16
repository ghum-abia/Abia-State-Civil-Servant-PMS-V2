// src/pages/staff/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useOfficerDashboard } from '../../hooks/staff/useOfficerDashboard';
import { useStaffTasks } from '../../hooks/staff/useStaffTasks';
import { useStaffPerformance } from '../../hooks/staff/useStaffPerformance';
import PeriodFilter from '../../components/UI/PeriodFilter';
import OfficerPerformanceTrend from '../../components/staff/OfficerPerformanceTrend';
import Spinner from '../../components/UI/Spinner';
import { 
  Calendar, 
  Check, 
  AlertTriangle, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const StaffDashboard = () => {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const { dashboardData, isLoading: isDashboardLoading, error: dashboardError, fetchDashboardData } = useOfficerDashboard();
  const { tasks, fetchTasks } = useStaffTasks();
  const { scorecard, fetchMyScorecard } = useStaffPerformance();

  useEffect(() => {
    fetchMyScorecard();
    fetchDashboardData({ month: period.month, year: period.year });
    fetchTasks({ limit: 5, month: period.month, year: period.year });
  }, [period, fetchDashboardData, fetchTasks, fetchMyScorecard]);

  if (isDashboardLoading) return <Spinner />;
  
  const {
    officer_name = 'Officer',
    active_tasks = 0,
    completed_tasks = 0,
    overdue_tasks = 0,
    kpi_performance_score = 0,
    recent_activities = [],
    six_month_trend = [],
  } = dashboardData || {};

  // Donut Chart Data
  const donutData = [
    { name: 'Completed', value: kpi_performance_score || 0 },
    { name: 'Remaining', value: Math.max(0, 100 - (kpi_performance_score || 0)) },
  ];
  const DONUT_COLORS = ['#0B5C35', '#E2E8F0'];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-12 text-slate-800">
      
      {/* Header & Integrated Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Good morning, {officer_name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">Here is your current performance and task overview.</p>
        </div>

        <div className="flex items-center gap-3">
          <PeriodFilter 
            month={period.month} 
            year={period.year} 
            onChange={(newPeriod) => setPeriod(newPeriod)} 
          />
        </div>
      </div>

      {dashboardError && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
          <AlertCircle size={18} className="shrink-0" />
          <span>{dashboardError}</span>
        </div>
      )}

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-md border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Tasks Due</p>
            <h3 className="text-3xl font-sans text-slate-900 font-semibold mt-2">{String(active_tasks)}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Active assignments</p>
          </div>
          <div className="p-2 bg-slate-50 rounded-md text-slate-400 border border-slate-100"><Calendar size={18} /></div>
        </div>

        <div className="bg-white p-5 rounded-md border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Completed Tasks</p>
            <h3 className="text-3xl font-sans font-semibold text-emerald-800 mt-2">{completed_tasks}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Selected period</p>
          </div>
          <div className="p-2 bg-slate-50 rounded-md text-slate-400 border border-slate-100"><Check size={18} /></div>
        </div>

        <div className="bg-white p-5 rounded-md border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">Overdue Tasks</p>
            <h3 className="text-3xl font-sans font-semibold text-rose-600 mt-2">{String(overdue_tasks)}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Needs attention</p>
          </div>
          <div className="p-2 bg-slate-50 rounded-md text-slate-400 border border-slate-100"><AlertTriangle size={18} /></div>
        </div>

        <div className="bg-white p-5 rounded-md border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">Current Performance</p>
            <h3 className="text-3xl font-sans font-semibold text-emerald-700 mt-2">{kpi_performance_score}%</h3>
            <p className={`text-[11px] mt-1 ${kpi_performance_score >= 60 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {kpi_performance_score >= 70 ? 'Excellent performance' : kpi_performance_score > 39 ? 'Good performance' : 'Needs improvement'}
            </p>
          </div>
          <div className="p-2 bg-slate-50 rounded-md text-slate-400 border border-slate-100"><TrendingUp size={18} /></div>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Performance Overview Donut */}
        <div className="bg-white p-6 flex flex-col rounded-md border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-sans text-slate-900">Performance Overview</h3>

          <div className="relative flex flex-col items-center justify-center py-2">
            <div className="w-36 h-36 flex relative items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center absolute top-16">
              <span className="text-xl text-center font-bold text-slate-900">{kpi_performance_score}%</span>
            </div>

            <div className="mt-2 text-center w-full">
              <p className="text-sm font-bold text-slate-800">Overall Performance</p>
              <span className="inline-block bg-sky-100/70 text-sky-800 text-[12px] font-bold px-2 py-0.5 rounded-full mt-1">
                {kpi_performance_score >= 70 ? 'Excellent' : kpi_performance_score > 39 ? 'Good' : 'Needs Improvement'}
              </span>

              {/* Scorecard Sub-metrics */}
              <div className="box grid grid-cols-2 gap-3 mt-4 text-left">
                <div className="border p-2.5 rounded border-slate-200/60 shadow-sm bg-slate-50/50">
                  <span className="text-[#146C43] text-base font-semibold">{scorecard?.total_rated_tasks || 0}</span>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase">Rated Tasks</p>
                </div>
                <div className="border p-2.5 rounded border-slate-200/60 shadow-sm bg-slate-50/50">
                  <span className="text-[#146C43] text-base font-semibold">{scorecard?.overall_performance || 0}%</span>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase">Task Performance</p>
                </div>
                <div className="border p-2.5 rounded border-slate-200/60 shadow-sm bg-slate-50/50">
                  <span className="text-[#146C43] text-base font-semibold">{scorecard?.average_efficiency || 0}%</span>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase">Efficiency</p>
                </div>
                <div className="border p-2.5 rounded border-slate-200/60 shadow-sm bg-slate-50/50">
                  <span className="text-[#146C43] text-base font-semibold">{scorecard?.average_quality || 0}%</span>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase">Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white rounded-md border lg:col-span-2 border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
            {recent_activities && recent_activities.length > 0 ? (
              recent_activities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-none">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{activity.title || 'Activity Update'}</p>
                    <p className={`text-[11px] font-semibold ${activity.status === 'RATED' ? 'text-emerald-600' : activity.status === 'NEEDS_CORRECTION' ? 'text-amber-600' : activity.status === 'SUBMITTED' ? 'text-purple-600' : 'text-slate-400'} mt-0.5`}>
                      Status: {activity.status === 'RATED' ? 'APPROVED' : activity.status || 'N/A'}
                    </p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : 'Recently'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-12">No recent activities recorded for this period.</p>
            )}
          </div>
        </div>

        {/* Recharts Trend Component */}
        <div className="lg:col-span-3">
          <OfficerPerformanceTrend trendData={six_month_trend} />
        </div>
      </div>

      {/* My Tasks Table */}
      <div className="bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">My Tasks</h3>
          <span className="text-xs text-slate-400">Showing recent tasks for {period.month}/{period.year}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-[10px] font-semibold text-slate-400 border-b border-slate-100">
              <tr className="uppercase">
                <th className="py-3 px-4 font-normal">Task Title</th>
                <th className="py-3 px-4 font-normal">Due Date</th>
                <th className="py-3 px-4 font-normal">Status</th>
                <th className="py-3 px-4 font-normal">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {tasks.slice(0, 5).map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">{task.title}</td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full ${
                        task.status === 'RATED'
                          ? 'text-emerald-700 bg-emerald-100/70 border border-emerald-200'
                          : task.status === 'SUBMITTED'
                          ? 'text-blue-700 bg-blue-100/70 border border-blue-200'
                          : task.status === 'NEEDS_CORRECTION'
                          ? 'text-amber-700 bg-amber-100/70 border border-amber-200'
                          : 'text-slate-600 bg-slate-100'
                      }`}
                    >
                      {task.status === 'RATED' ? 'APPROVED' : task.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-semibold">
                    {task.weight > 0 && task.weight <= 4 ? 'Low' 
                    : task.weight > 4 && task.weight <= 6 ? 'Medium' 
                    : task.weight > 6 && task.weight <= 8 ? 'High' 
                    : task.weight > 8 ? 'Critical' : 'None'}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-slate-400">No tasks found for this period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default StaffDashboard;