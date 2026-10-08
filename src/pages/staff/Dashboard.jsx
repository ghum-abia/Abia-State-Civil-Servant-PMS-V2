import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  Clock 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import api from '../../services/api/api';

const trendData = [
  { month: 'Apr', score: 81 },
  { month: 'May', score: 83 },
  { month: 'Jun', score: 81 },
  { month: 'Jul', score: 85 },
  { month: 'Aug', score: 83 },
  { month: 'Sep', score: 84 },
];

export default function StaffDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashRes, tasksRes] = await Promise.all([
          api.get('/dashboard/officer'), //[cite: 1]
          api.get('/tasks') //[cite: 1]
        ]);
        setDashboardData(dashRes.data);
        setTasks(tasksRes.data?.tasks || tasksRes.data || []);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">Approved</span>;
      case 'submitted':
        return <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">Submitted</span>;
      case 'overdue':
        return <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">Overdue</span>;
      case 'in progress':
        return <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">In Progress</span>;
      case 'returned':
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">Returned</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-md text-[11px] font-semibold">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header Greeting */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Good morning, John</h2>
        <p className="text-xs text-slate-500 mt-0.5">Here is your current performance and task overview.</p>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Tasks Due</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">03</h3>
            <p className="text-[11px] text-slate-400 mt-1">Active assignments</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
            <Calendar size={18} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Completed Tasks</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">2</h3>
            <p className="text-[11px] text-slate-400 mt-1">This period</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg text-emerald-600 border border-slate-100">
            <CheckCircle2 size={18} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Overdue Tasks</p>
            <h3 className="text-3xl font-extrabold text-rose-600 mt-2">01</h3>
            <p className="text-[11px] text-slate-400 mt-1">Needs immediate attention</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg text-rose-500 border border-slate-100">
            <AlertTriangle size={18} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Current Performance</p>
            <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">84%</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Very Good</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg text-emerald-600 border border-slate-100">
            <TrendingUp size={18} />
          </div>
        </div>

      </div>

      {/* Middle Section: Performance Overview & Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Overall Performance Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Performance Overview</h3>
          
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-32 h-32 rounded-full border-[10px] border-slate-100 border-t-emerald-600 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900">86%</span>
            </div>
            <p className="text-xs font-bold text-slate-900 mt-3">Overall Performance</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Very Good</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-center">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-base font-bold text-slate-900">86%</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">KPI Achievement</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-base font-bold text-slate-900">84%</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Task Performance</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-base font-bold text-slate-900">91%</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Completion Rate</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-base font-bold text-slate-900">82%</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Task Quality</p>
            </div>
          </div>
        </div>

        {/* Right: Performance Trend Line Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Performance Trend</h3>
            <span className="text-[11px] text-slate-400 font-medium">Last 6 months</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis domain={[60, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#0B5C35" strokeWidth={2.5} dot={{ fill: '#0B5C35', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-[11px]">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-600">Task Completion Rate</span>
                <span className="text-emerald-600">On Track</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[96%]"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-900 mt-1 block">96%</span>
            </div>
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-600">Report Accuracy</span>
                <span className="text-emerald-600">On Track</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[98%]"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-900 mt-1 block">98%</span>
            </div>
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-600">Timeliness</span>
                <span className="text-amber-600">At Risk</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[94%]"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-900 mt-1 block">94%</span>
            </div>
          </div>
        </div>

      </div>

      {/* My Tasks Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">My Tasks</h3>
          <button className="text-xs font-semibold text-[#0B5C35] hover:underline">View all</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Task</th>
                <th className="py-3 px-6">Assigned By</th>
                <th className="py-3 px-6">Due Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Performance</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.length > 0 ? (
                tasks.map((task, i) => (
                  <tr key={task.id || i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{task.title || task.name}</p>
                      <p className="text-[11px] text-slate-400">{task.department || 'Administration'}</p>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">{task.assigned_by || 'Samuel Ojiemen'}</td>
                    <td className="py-4 px-6 text-slate-600">{task.due_date || '07 Sept 2026'}</td>
                    <td className="py-4 px-6">{getStatusBadge(task.status || 'Approved')}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">{task.performance || '83%'}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-xs font-semibold text-[#0B5C35] hover:bg-emerald-50 px-3 py-1 rounded-md border border-emerald-600/30 transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6"><p className="font-bold text-slate-900">September Monthly Report</p><p className="text-[11px] text-slate-400">Administration</p></td>
                    <td className="py-4 px-6 text-slate-600 font-medium">Samuel Ojiemen</td>
                    <td className="py-4 px-6 text-slate-600">07 Sept 2026</td>
                    <td className="py-4 px-6">{getStatusBadge('Approved')}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">83%</td>
                    <td className="py-4 px-6 text-right"><button className="text-xs font-semibold text-[#0B5C35] hover:bg-emerald-50 px-3 py-1 rounded-md border border-emerald-600/30 transition-colors">View</button></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6"><p className="font-bold text-slate-900">Payroll Review</p><p className="text-[11px] text-slate-400">Administration</p></td>
                    <td className="py-4 px-6 text-slate-600 font-medium">Samuel Ojiemen</td>
                    <td className="py-4 px-6 text-slate-600">10 Sept 2026</td>
                    <td className="py-4 px-6">{getStatusBadge('Submitted')}</td>
                    <td className="py-4 px-6 font-bold text-slate-400">Pending</td>
                    <td className="py-4 px-6 text-right"><button className="text-xs font-semibold text-[#0B5C35] hover:bg-emerald-50 px-3 py-1 rounded-md border border-emerald-600/30 transition-colors">View</button></td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6"><p className="font-bold text-slate-900">Data Analysis</p><p className="text-[11px] text-slate-400">Administration</p></td>
                    <td className="py-4 px-6 text-slate-600 font-medium">Samuel Ojiemen</td>
                    <td className="py-4 px-6 text-slate-600">05 Sept 2026</td>
                    <td className="py-4 px-6">{getStatusBadge('Overdue')}</td>
                    <td className="py-4 px-6 font-bold text-slate-400">—</td>
                    <td className="py-4 px-6 text-right"><button className="text-xs font-semibold text-[#0B5C35] hover:bg-emerald-50 px-3 py-1 rounded-md border border-emerald-600/30 transition-colors">View</button></td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <CheckCircle2 size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Task approved</p>
              <p className="text-[11px] text-slate-500">September Report was approved by Samuel Ojiemen.</p>
              <span className="text-[10px] text-slate-400 mt-0.5 block">07 Sept 2026, 14:32</span>
            </div>
          </div>

          <div className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <Clock size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Correction requested</p>
              <p className="text-[11px] text-slate-500">Attendance schedule needs to be attached to Quarterly Meeting Minutes.</p>
              <span className="text-[10px] text-slate-400 mt-0.5 block">05 Sept 2026, 11:15</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}