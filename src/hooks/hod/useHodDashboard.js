// src/hooks/hod/useHodDashboard.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useHodDashboard = () => {
  const [hodData, setHodData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * GET /api/v1/dashboard/hod
   * Fetch HOD executive overview, team performance, and tasks requiring attention
   */
  const fetchHodDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/dashboard/hod');
      setHodData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch HOD dashboard metrics.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    hodData,
    isLoading,
    error,
    fetchHodDashboard,
  };
};