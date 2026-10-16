// src/pages/staff/Performance.jsx
import React, { useState, useEffect } from 'react';
import { useStaffPerformance } from '../../hooks/staff/useStaffPerformance';
import { useOfficerDashboard } from '../../hooks/staff/useOfficerDashboard';
import PeriodFilter from '../../components/UI/PeriodFilter';
import OfficerPerformanceTrend from '../../components/staff/OfficerPerformanceTrend';
import Spinner from '../../components/UI/Spinner';

export default function Performance() {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const { scorecard, fetchMyScorecard, isLoading: loadingScorecard } = useStaffPerformance();
  const { dashboardData, fetchDashboardData, isLoading: loadingDashboard } = useOfficerDashboard();
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    fetchMyScorecard({ month: period.month, year: period.year });
    fetchDashboardData({ month: period.month, year: period.year });
  }, [period, fetchMyScorecard, fetchDashboardData]);

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
  const isLoading = loadingScorecard || loadingDashboard;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      
      {/* Top Header & Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500">
            Detailed breakdown of task metrics, quality index, and efficiency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PeriodFilter 
            month={period.month} 
            year={period.year} 
            onChange={(newPeriod) => setPeriod(newPeriod)} 
          />
        </div>
      </div>

      {/* Top Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-bold transition-all relative ${
                activeTab === tab.id
                  ? 'text-[#0B5C35] border-b-2 border-[#0B5C35]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {isLoading ? (
        <div className="py-20">
          <Spinner />
        </div>
      ) : activeTab === 'Overview' ? (
        <div className="space-y-6">
          {/* Top 4 Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${card.dotColor}`} />
                      <span className="text-xs font-bold text-slate-500">{card.title}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-3">
                    {card.value}%
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2 text-[11px] border-t border-slate-50">
                  <span className="text-slate-400 font-semibold">{card.target}</span>
                  <span className="text-emerald-700 font-bold">Period Active</span>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Trend Card with trendData and selectedPeriod passed */}
          <OfficerPerformanceTrend 
            trendData={sixMonthTrend} 
            selectedPeriod={period} 
          />
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <h3 className="text-sm font-bold text-slate-700">{activeTab} Details</h3>
          <p className="text-xs text-slate-400 mt-1">Content for this module is loading...</p>
        </div>
      )}
    </div>
  );
}