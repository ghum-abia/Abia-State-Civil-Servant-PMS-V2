// src/hooks/useStaffPerformance.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useStaffPerformance = () => {
  const [scorecard, setScorecard] = useState(null);
  const [selectedTaskScore, setSelectedTaskScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTaskScoreLoading, setIsTaskScoreLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * GET /api/v1/tasks/me/scores
   * Fetch cumulative performance, quality, efficiency averages, and task trend history
   */
  const fetchMyScorecard = useCallback(async (officerId = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = officerId ? { officer_id: officerId } : {};
      const response = await api.get('/tasks/me/scores', { params });
      setScorecard(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch performance scorecard.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * GET /api/v1/tasks/{task_id}/score
   * Fetch structured score metrics for a specific task summary card
   */
  const fetchTaskScore = useCallback(async (taskId) => {
    setIsTaskScoreLoading(true);
    setError(null);
    try {
      const response = await api.get(`/tasks/${taskId}/score`);
      setSelectedTaskScore(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load task score summary.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsTaskScoreLoading(false);
    }
  }, []);

  const clearSelectedTaskScore = () => setSelectedTaskScore(null);

  return {
    scorecard,
    selectedTaskScore,
    isLoading,
    isTaskScoreLoading,
    error,
    fetchMyScorecard,
    fetchTaskScore,
    clearSelectedTaskScore,
  };
};