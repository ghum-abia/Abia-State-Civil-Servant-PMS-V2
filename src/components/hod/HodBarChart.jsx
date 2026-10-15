// src/components/hod/HodBarChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function HodBarChart({ data }) {
  // Sample departmental benchmark metrics
  const chartData = data || [
    { name: 'Administration', Performance: 84, Quality: 82, Efficiency: 87 },
    { name: 'Finance', Performance: 78, Quality: 75, Efficiency: 80 },
    { name: 'Human Resources', Performance: 90, Quality: 91, Efficiency: 93 },
    { name: 'ICT', Performance: 82, Quality: 80, Efficiency: 83 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
          Department Comparison
        </h3>
        <span className="text-xs text-slate-400 font-medium">Q3 2026</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              domain={[60, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ paddingTop: '15px', fontSize: '11px' }}
            />
            <Bar dataKey="Performance" fill="#0B5C35" radius={[4, 4, 0, 0]} barSize={22} />
            <Bar dataKey="Quality" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={22} />
            <Bar dataKey="Efficiency" fill="#D97706" radius={[4, 4, 0, 0]} barSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}