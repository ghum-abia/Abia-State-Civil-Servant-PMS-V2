// src/components/hod/HodPieChart.jsx
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function HodPieChart({ data }) {
  // Default distribution if none provided
  const distributionData = data || [
    { name: 'Excellent', value: 1, color: '#0B5C35' },
    { name: 'Very Good', value: 2, color: '#2563EB' },
    { name: 'Satisfactory', value: 1, color: '#D97706' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
      <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
        Performance Distribution
      </h3>

      <div className="flex items-center justify-between gap-4 h-48">
        {/* Donut Chart */}
        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                innerRadius={45}
                outerRadius={65}
                paddingAngle={4}
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-1/2 space-y-3 text-xs font-semibold">
          {distributionData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 font-medium">{item.name}</span>
              </div>
              <span className="font-extrabold text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}