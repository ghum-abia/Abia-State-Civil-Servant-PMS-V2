// src/hooks/hom/useHOMdashboard.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useHOMdashboard = () => {
  const [homData, setHomData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * GET /api/v1/dashboard/hom?month=10&year=2026
   */
  const fetchHOMDashboard = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);

    const params = {};
    if (filters.month) params.month = filters.month;
    if (filters.year) params.year = filters.year;

    try {
      const response = await api.get('/dashboard/hom', { params });
      setHomData(response.data);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        'Failed to load HOM dashboard metrics.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    homData,
    mda_id: homData?.mda_id || null,
    permanent_secretary_name: homData?.permanent_secretary_name || '',
    selected_period: homData?.selected_period || '',
    selected_month: homData?.selected_month || new Date().getMonth() + 1,
    selected_year: homData?.selected_year || new Date().getFullYear(),
    mda_performance_average: homData?.mda_performance_average || 0,
    total_mda_staff: homData?.total_mda_staff || 0,
    total_tasks_created: homData?.total_tasks_created || 0,
    total_tasks_completed: homData?.total_tasks_completed || 0,
    total_tasks_overdue: homData?.total_tasks_overdue || 0,
    pending_reviews_count: homData?.pending_reviews_count || 0,
    department_rankings: homData?.department_rankings || [],
    isLoading,
    error,
    fetchHOMDashboard,
  };
};