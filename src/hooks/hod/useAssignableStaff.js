// src/hooks/hod/useAssignableStaff.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useAssignableStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAssignableStaff = useCallback(async (params = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/auth/users', { params });
      // Ensure we handle array data regardless of wrapper
      const data = Array.isArray(response.data) ? response.data : response.data?.users || [];
      setStaffList(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch staff directory.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    staffList,
    isLoading,
    error,
    fetchAssignableStaff,
  };
};