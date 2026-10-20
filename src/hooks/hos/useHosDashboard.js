// src/hooks/hos/useHosDashboard.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useHosDashboard = () => {
  const [hosData, setHosData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * GET /api/v1/dashboard/hos
   * Fetch HOS state-wide civil service performance overview
   */
  const fetchHosDashboard = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);

    const params = {};
    if (filters.month) params.month = filters.month;
    if (filters.year) params.year = filters.year;

    try {
      const response = await api.get('/dashboard/hos', { params });
      setHosData(response.data);
    } catch (err) {
      const msg = 
        err.response?.data?.message || 
        err.response?.data?.detail || 
        'Failed to load state civil service dashboard.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    hosData,
    state_performance_index: hosData?.state_performance_index ?? 0,
    selected_period: hosData?.selected_period || '',
    selected_month: hosData?.selected_month || 10,
    selected_year: hosData?.selected_year || 2026,
    total_active_staff: hosData?.total_active_staff ?? 0,
    total_tasks_created: hosData?.total_tasks_created ?? 0,
    total_tasks_completed: hosData?.total_tasks_completed ?? 0,
    total_tasks_overdue: hosData?.total_tasks_overdue ?? 0,
    state_completion_rate: hosData?.state_completion_rate ?? 0,
    mda_rankings: hosData?.mda_rankings || [],
    isLoading,
    error,
    fetchHosDashboard,
  };
};