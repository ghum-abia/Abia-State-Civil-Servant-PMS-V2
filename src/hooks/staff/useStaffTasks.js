// src/hooks/useStaffTasks.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useStaffTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /**
   * GET /api/v1/tasks
   * Fetch tasks with optional filters (status, is_overdue, etc.)
   */
  const fetchTasks = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/tasks', { params: filters });
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * POST /api/v1/tasks/{task_id}/submit
   * Submit task evidence file and notes
   */
  const submitTaskEvidence = useCallback(async (taskId, file, notes = '') => {
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (notes) {
        formData.append('notes', notes);
      }

      const response = await api.post(`/tasks/${taskId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update local task state after successful submission
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: 'SUBMITTED',
                current_submission_count: (task.current_submission_count || 0) + 1,
              }
            : task
        )
      );

      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit task evidence.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    tasks,
    isLoading,
    isSubmitting,
    error,
    fetchTasks,
    submitTaskEvidence,
  };
};