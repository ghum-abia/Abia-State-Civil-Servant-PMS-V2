// src/components/charts/DepartmentComparisonChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LabelList
} from 'recharts';

// Default fallback data matching your design screenshot
const DEFAULT_DEPARTMENTS = [
  { name: 'Administration', score: 88 },
  { name: 'Finance', score: 84 },
  { name: 'Human Resources', score: 91 },
  { name: 'Planning & Research', score: 79 },
  { name: 'ICT', score: 87 },
];

export default function DepartmentComparisonChart({ data = DEFAULT_DEPARTMENTS, title = "DEPARTMENT PERFORMANCE COMPARISON" }) {
  // Map incoming data to ensure proper key names
  const chartData = (data && data.length > 0)
    ? data.map((dept) => ({
        name: dept.department_name || dept.department_id || dept.name,
        score: Number(dept.average_performance ?? dept.score ?? 0),
      }))
    : DEFAULT_DEPARTMENTS;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      {/* Chart Title */}
      <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
        {title}
      </h3>

      {/* Chart Container */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
            barCategoryGap={12}
          >
            {/* Horizontal X Axis domain restricted from 60 to 100 as shown in UI */}
            <XAxis
              type="number"
              domain={[60, 100]}
              ticks={[60, 70, 80, 90, 100]}
              stroke="#94a3b8"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
            />

            {/* Vertical Y Axis with department names */}
            <YAxis
              type="category"
              dataKey="name"
              stroke="#64748b"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              width={110}
            />

            {/* Tooltip on hover */}
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                fontSize: '12px',
                fontWeight: '600',
              }}
              formatter={(value) => [`${value}%`, 'Score']}
            />

            {/* Main Bar Component */}
            <Bar
              dataKey="score"
              fill="#0B5C35"
              radius={[0, 6, 6, 0]}
              barSize={20}
            >
              {/* Score Labels rendered directly beside the end of bars */}
              <LabelList
                dataKey="score"
                position="right"
                formatter={(val) => `${val}%`}
                style={{
                  fill: '#64748b',
                  fontSize: '11px',
                  fontWeight: '700',
                }}
                offset={8}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}