// src/pages/hod/HodDashboard.jsx
import React, { useEffect } from 'react';
import { useHodDashboard } from '../../hooks/hod/useHodDashboard';
import { useStaffTasks } from '../../hooks/staff/useStaffTasks';
import HodPerformanceTrend from '../../components/hod/HodPerformanceTrend';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Loader2, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const HodDashboard = () => {
  const { hodData, isLoading, error, fetchHodDashboard } = useHodDashboard();
  const { tasks, fetchTasks } = useStaffTasks();

  useEffect(() => {
    fetchHodDashboard();
    fetchTasks({ limit: 5 });
  }, [fetchHodDashboard, fetchTasks]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-slate-200">
        <Loader2 size={32} className="animate-spin text-[#0B5C35] mb-2" />
        <p className="text-xs text-slate-500 font-medium">Loading departmental overview...</p>
      </div>
    );
  }

  // Extract backend payload from GET /api/v1/dashboard/hod
  const {
    hod_name = 'Director',
    team_performance_average = 0,
    tasks_completed_count = 0,
    pending_reviews_count = 0,
    overdue_tasks_count = 0,
    team_leaderboard = [],
    tasks_requiring_attention = {
      overdue_count: 0,
      awaiting_review_count: 0,
      returned_for_correction_count: 0,
    },
  } = hodData || {};

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans font-semibold pb-12 text-slate-800">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Good morning, {hod_name.split(' ')[0]}</h2>
        <p className="text-xs text-slate-500 mt-0.5">Monitor your team's performance and outstanding tasks.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Top 4 Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Team Performance</p>
          <div className="mt-2">
            <h3 className="text-3xl font-sans font-semibold text-[#0B5C35]">{team_performance_average}%</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Departmental Avg Score</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tasks Completed</p>
          <div className="mt-2">
            <h3 className="text-3xl font-sans font-semibold text-slate-900">{tasks_completed_count}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">This period</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Reviews</p>
          <div className="mt-2">
            <h3 className="text-3xl font-sans font-semibold text-amber-600">{String(pending_reviews_count)}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Awaiting your review</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overdue Tasks</p>
          <div className="mt-2">
            <h3 className="text-3xl font-sans font-semibold text-rose-600">{String(overdue_tasks_count)}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Needs attention</p>
          </div>
        </div>
      </div>

      {/* Middle Section: Team Leaderboard & Performance Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Team Leaderboard */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Team Performance</h3>
            <button className="text-[11px] text-[#0B5C35] font-bold hover:underline">Details</button>
          </div>

          <div className="space-y-4 pt-2">
            {team_leaderboard.length > 0 ? (
              team_leaderboard.map((member) => (
                <div key={member.officer_id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
                        {member.officer_name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="font-bold text-slate-800">{member.officer_name}</span>
                    </div>
                    <span className="font-bold text-[#0B5C35]">{member.average_performance}%</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#0B5C35] h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(member.average_performance, 100)}%` }} 
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No team members evaluated yet.</p>
            )}
          </div>
        </div>

        {/* Recharts Area Chart Trend Component */}
        <div className="lg:col-span-2">
          <HodPerformanceTrend averageScore={team_performance_average} />
        </div>
      </div>

      {/* Tasks Requiring Attention */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tasks Requiring Attention</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-rose-50/70 border border-rose-100 rounded-2xl text-center">
            <h4 className="text-3xl font-sans font-semibold text-rose-600">{tasks_requiring_attention.overdue_count}</h4>
            <p className="text-xs font-semibold text-rose-700 mt-1">Overdue</p>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl text-center">
            <h4 className="text-3xl font-sans font-semibold text-amber-600">{tasks_requiring_attention.awaiting_review_count}</h4>
            <p className="text-xs font-semibold text-amber-800 mt-1">Awaiting Review</p>
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-center">
            <h4 className="text-3xl font-sans font-semibold text-indigo-600">{tasks_requiring_attention.returned_for_correction_count}</h4>
            <p className="text-xs font-semibold text-indigo-800 mt-1">Returned</p>
          </div>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Submissions</h3>
          <button className="text-xs text-[#0B5C35] font-bold hover:underline flex items-center gap-0.5">
            View all tasks <ChevronRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-[10px] font-semibold text-slate-400 uppercase border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 font-bold">Task</th>
                <th className="py-3 px-4 font-bold">Officer</th>
                <th className="py-3 px-4 font-bold">Submitted</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {tasks.slice(0, 5).map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">{task.title}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{task.assignee_name || 'John Doe'}</td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-3 py-1 text-[11px] font-bold rounded-full bg-blue-100/70 text-blue-700 border border-blue-200">
                      {task.status === 'RATED' ? 'APPROVED' : task.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="px-4 py-1.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-lg text-xs font-bold transition-all shadow-sm">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-400">No recent submissions to review.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HodDashboard;