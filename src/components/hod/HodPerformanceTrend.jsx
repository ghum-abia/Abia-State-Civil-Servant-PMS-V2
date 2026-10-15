// src/components/hod/HodPerformanceTrend.jsx
import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

const HodPerformanceTrend = ({ trendData = [] }) => {
  // Map the backend six_month_trend data (e.g., "Sep 2026" -> "Sep")
  const chartData = trendData.map((item) => ({
    month: item.month_name.split(' ')[0], // Extracts "May", "Jun", etc.
    score: item.average_performance,
    completed: item.tasks_completed,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Team Performance Trend</h3>
        <span className="text-xs text-slate-400 font-medium">Last 6 months</span>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="hodTrendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B5C35" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0B5C35" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <Tooltip 
              formatter={(value, name) => [
                name === 'score' ? `${value}%` : value, 
                name === 'score' ? 'Avg Performance' : 'Tasks Completed'
              ]} 
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#0B5C35"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#hodTrendGradient)"
              dot={{ fill: '#0B5C35', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HodPerformanceTrend;