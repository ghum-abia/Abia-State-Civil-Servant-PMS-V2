import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse bg-gray-50 min-h-screen">
      {/* Top Welcome Section Skeleton */}
      <div className="space-y-2">
        <div className="h-7 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-72"></div>
      </div>

      {/* Top Metric Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-12"></div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 h-80 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-8 border-gray-100"></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 h-80"></div>
      </div>

      {/* Table Rows Skeleton */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        <div className="h-5 bg-gray-200 rounded w-32"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-gray-100 rounded w-full"></div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;