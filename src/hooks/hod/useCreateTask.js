// src/hooks/hod/useCreateTask.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useCreateTask = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createTask = useCallback(async (payload) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post('/tasks', payload);
      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.detail || 'Failed to assign task.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    isSubmitting,
    error,
    createTask,
  };
};