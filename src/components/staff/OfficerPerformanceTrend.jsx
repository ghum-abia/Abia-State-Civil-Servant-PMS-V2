// src/components/Performance/OfficerPerformanceTrend.jsx
import React, { useEffect } from 'react';
import { useStaffPerformance } from '../../hooks/staff/useStaffPerformance';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

const OfficerPerformanceTrend = ({ data = [] }) => {
  const { scorecard, isLoading, error, fetchMyScorecard } = useStaffPerformance();

  useEffect(() => {
    fetchMyScorecard();
  }, [fetchMyScorecard]);

  const chartData = data.length > 0 ? data : [
    { month: 'Apr', score: 0 },
    { month: 'May', score: 0 },
    { month: 'Jun', score: 0 },
    { month: 'Jul', score: 0 },
    { month: 'Aug', score: 0 },
    { month: 'Sep', score: 0 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Performance Trend</h3>
        <span className="text-xs text-slate-400 font-medium">Last 6 months</span>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B5C35" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#0B5C35" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#0B5C35"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#trendGradient)"
              dot={{ fill: '#0B5C35', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom KPI Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-slate-500">Monthly Task Quality</span>
          </div>
          <p className="text-xs font-extrabold text-slate-900 mt-2">{scorecard?.average_quality ?? 0}%</p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-[#0B5C35] h-full rounded-full" style={{ width: `${scorecard?.average_quality ?? 0}%` }} />
          </div>
        </div>

        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-slate-500">Monthly Task Efficiency</span>
          </div>
          <p className="text-xs font-extrabold text-slate-900 mt-2">{scorecard?.average_efficiency ?? 0}%</p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-[#0B5C35] h-full rounded-full" style={{ width: `${scorecard?.average_efficiency ?? 0}%` }} />
          </div>
        </div>

        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-slate-500">Monthly Approved Tasks</span>
          </div>
          <p className="text-xs font-extrabold text-slate-900 mt-2">{scorecard?.total_rated_tasks ?? 0}%</p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${scorecard?.total_rated_tasks ?? 0}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerPerformanceTrend;