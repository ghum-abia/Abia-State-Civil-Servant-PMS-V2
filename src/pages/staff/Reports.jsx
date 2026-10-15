// src/pages/staff/Reports.jsx
import React, { useEffect } from 'react';
import OfficerPerformanceTrend from '../../components/staff/OfficerPerformanceTrend';
import { useOfficerDashboard } from '../../hooks/staff/useOfficerDashboard';

const Reports = () => {
  const { dashboardData, fetchDashboardData } = useOfficerDashboard();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const sixMonthTrend = dashboardData?.six_month_trend || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Performance Reports & Trends</h2>
        <p className="text-xs text-slate-500">Review historical performance metrics and progress.</p>
        
        <div className="pt-4">
          <OfficerPerformanceTrend trendData={sixMonthTrend} />
        </div>
      </div>
    </div>
  );
};

export default Reports;