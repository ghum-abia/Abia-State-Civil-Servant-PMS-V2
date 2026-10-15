// src/pages/staff/Performance.jsx
import React, { useState, useEffect } from 'react';
import { useStaffPerformance } from '../../hooks/staff/useStaffPerformance';
import { useOfficerDashboard } from '../../hooks/staff/useOfficerDashboard';
import OfficerPerformanceTrend from '../../components/staff/OfficerPerformanceTrend';

const Performance = () => {
  const { scorecard, fetchMyScorecard } = useStaffPerformance();
  const { dashboardData, fetchDashboardData } = useOfficerDashboard();
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    fetchMyScorecard();
    fetchDashboardData();
  }, [fetchMyScorecard, fetchDashboardData]);

  // Tab Navigation items
  const navTabs = [
    { id: 'Overview', label: 'Overview' },
  ];

  // Metrics Data matching design specs
  const metricCards = [
    {
      title: 'Performance Score',
      value: scorecard?.overall_performance || 0,
      target: 'Target 100%',
      dotColor: 'bg-emerald-600',
    },
    {
      title: 'Quality',
      value: scorecard?.average_quality || 0,
      target: 'Target 100%',
      dotColor: 'bg-blue-600',
    },
    {
      title: 'Efficiency',
      value: scorecard?.average_efficiency || 0,
      target: 'Target 100%',
      dotColor: 'bg-emerald-600',
    },
    {
      title: 'KPI Achievement',
      value: scorecard?.overall_performance || 0,
      target: 'Target 100%',
      dotColor: 'bg-emerald-600',
    },
  ];

  const sixMonthTrend = dashboardData?.six_month_trend || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans font-semibold">
      {/* Top Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-semibold transition-all relative ${
                activeTab === tab.id
                  ? 'text-[#0B5C35] font-bold border-b-2 border-[#0B5C35]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'Overview' && (
        <>
          {/* Top 4 Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${card.dotColor}`} />
                      <span className="text-xs font-bold text-slate-500">{card.title}</span>
                    </div>
                  </div>

                  <h3 className="text-4xl font-sans font-semibold text-slate-900 mt-3">{card.value}%</h3>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2 text-[11px]">
                  <span className="text-slate-400 font-medium">{card.target}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Trend Card with trendData passed */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <OfficerPerformanceTrend trendData={sixMonthTrend} />
          </div>
        </>
      )}

      {activeTab !== 'Overview' && (
        <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm text-center">
          <h3 className="text-sm font-bold text-slate-700">{activeTab} Details</h3>
          <p className="text-xs text-slate-400 mt-1">Content for this module is loading...</p>
        </div>
      )}
    </div>
  );
};

export default Performance;