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
      const msg = err.response?.data?.message || 'Failed to load dashboard overview.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    dashboardData,
    isLoading,
    error,
    fetchDashboardData,
  };
};