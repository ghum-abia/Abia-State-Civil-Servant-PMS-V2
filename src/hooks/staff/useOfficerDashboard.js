// src/hooks/staff/useOfficerDashboard.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api.js';

export const useOfficerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/dashboard/officer');
      setDashboardData(response.data);
    } catch (err) {
      const msg = 
        err.response?.data?.message || 
        err.response?.data?.detail || 
        'Failed to load officer dashboard overview.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    dashboardData,
    officer_id: dashboardData?.officer_id || null,
    officer_name: dashboardData?.officer_name || '',
    active_tasks: dashboardData?.active_tasks || 0,
    completed_tasks: dashboardData?.completed_tasks || 0,
    overdue_tasks: dashboardData?.overdue_tasks || 0,
    kpi_performance_score: dashboardData?.kpi_performance_score || 0,
    actions_required: dashboardData?.actions_required || [],
    recent_activities: dashboardData?.recent_activities || [],
    six_month_trend: dashboardData?.six_month_trend || [],
    isLoading,
    error,
    fetchDashboardData,
  };
};