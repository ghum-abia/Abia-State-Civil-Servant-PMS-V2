import React, { useEffect } from 'react';
import { useOfficerDashboard } from '../../hooks/staff/useOfficerDashboard';
import { useStaffTasks } from '../../hooks/staff/useStaffTasks';
import { useStaffPerformance } from '../../hooks/staff/useStaffPerformance'
import OfficerPerformanceTrend from '../../components/staff/OfficerPerformanceTrend';
import Spinner from '../../components/UI/Spinner';
import { 
  Calendar, 
  Check, 
  AlertTriangle, 
  TrendingUp, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const StaffDashboard = () => {
  const { dashboardData, isLoading: isDashboardLoading, error: dashboardError, fetchDashboardData } = useOfficerDashboard();
  const { tasks, fetchTasks } = useStaffTasks();
  const { scorecard, isLoading, fetchMyScorecard } = useStaffPerformance();

  useEffect(() => {
    fetchMyScorecard();
    fetchDashboardData();
    fetchTasks({ limit: 5 });
  }, [fetchDashboardData, fetchTasks]);

  if (isDashboardLoading) return <Spinner />
  
  
  // Live Dashboard Data from GET /api/v1/dashboard/officer
  const {
    officer_name = 'Officer',
    active_tasks = 0,
    completed_tasks = 0,
    overdue_tasks = 0,
    kpi_performance_score = 0,
    recent_activities = [],
  } = dashboardData || {};

  // Donut Chart Data
  const donutData = [
    { name: 'Completed', value: kpi_performance_score || 84 },
    { name: 'Remaining', value: 100 - (kpi_performance_score || 84) },
  ];
  const DONUT_COLORS = ['#0B5C35', '#E2E8F0'];



  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-12 text-slate-800">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Good morning, {officer_name}</h2>
        <p className="text-xs text-slate-500 mt-0.5">Here is your current performance and task overview.</p>
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
            <p className="text-[11px] text-slate-400 mt-1">This period</p>
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
            <p className={`text-[11px] text-slate-400 mt-1 ${kpi_performance_score >= 60 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {kpi_performance_score >= 70 ? 'Excellent performance' : kpi_performance_score > 39 && kpi_performance_score <= 69 ? 'Good performance': 'Needs improvement'}
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
            <div className=" text-center absolute top-16">
              <span className="text-xl text-center font-bold text-slate-900">{kpi_performance_score}%</span>
            </div>

            <div className="mt-2 text-center">
              <p className="text-sm font-bold text-slate-800">Overall Performance</p>
              <span className="inline-block bg-sky-100/70 text-sky-800 text-[12px] font-bold px-2 py-0.5 rounded-full mt-1">
                {kpi_performance_score >= 70 ? 'Excellent' : kpi_performance_score > 39 && kpi_performance_score <= 69 ? 'Good': 'Needs Improvement'}
              </span>


          {/* Cards */}
              <div className="box grid grid-cols-2 gap-4 mt-3">
                <span className="inline-block  border text-[10px] font-bold px-1 space-y-1 py-2 border-slate-300/20 shadow-sm mt-1">
                    <span className="score  text-[#146C43] text-[16px]">{scorecard?.total_rated_tasks || 0}</span>
                    <p className="text-[10px] text-slate  text-slate-400 font-semibold mt-0.5">Rated Tasks</p>
                </span>
                <span className="inline-block  border text-[10px] font-bold px-1 space-y-1 py-2 border-slate-300/20 shadow-sm mt-1">
                    <span className="score text-[#146C43] text-[16px]">{scorecard?.overall_performance || 0}%</span>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Task Performance</p>
                </span>
                <span className="inline-block  border text-[10px] font-bold px-1 space-y-1 py-2 border-slate-300/20 shadow-sm mt-1">
                    <span className="score  text-[#146C43] text-[16px]">{scorecard?.average_efficiency || 0}%</span>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Average Task Efficiency</p>
                </span>
                <span className="inline-block  border text-[10px] font-bold px-1 space-y-1 py-2 border-slate-300/20 shadow-sm mt-1">
                    <span className="score  text-[#146C43] text-[16px]">{scorecard?.average_quality || 0}%</span>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Average Task Quality</p>
                </span>
                
              </div>
            </div>
          </div>
        </div>

        {/* Recharts Trend Component */}
        <div className="lg:col-span-2">
          <OfficerPerformanceTrend />
        </div>
      </div>

      {/* My Tasks Table (Last 5 Tasks from useStaffTasks) */}
      <div className="bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">My Tasks</h3>
          <span className="text-xs text-slate-400">Showing recent tasks</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-[10px] font-semibold text-slate-400 border-b border-slate-100">
              <tr className="uppercase">
                <th className="py-3 px-4 font-normal">Task Title</th>
                <th className="py-3 px-4 font-normal">Due Date</th>
                <th className="py-3 px-4 font-normal">Status</th>
                <th className="py-3 px-4 font-normal">Weight</th>
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
      <td className="py-3.5 px-4 text-slate-600 font-semibold">{task.weight}%</td>
    </tr>
  ))}
  {tasks.length === 0 && (
    <tr>
      <td colSpan={5} className="text-center py-6 text-slate-400">No tasks found.</td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Timeline from dashboardData */}
      <div className="bg-white rounded-md border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>

        <div className="space-y-4">
          {recent_activities && recent_activities.length > 0 ? (
            recent_activities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{activity.title || 'Activity Update'}</p>
                  <p className={`text-[11px] ${activity.status === 'RATED' ? 'text-emerald-600' : 'text-slate-400'} mt-0.5`}>
                    Status: {activity.status === 'RATED' ? 'APPROVED' : activity.status || 'N/A'}
                  </p>
                  {console.log('activity.status', activity.status)}
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : 'Recently'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">No recent activities recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;