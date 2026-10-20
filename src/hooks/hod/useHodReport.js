// src/hooks/hod/useHodReport.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useHodReport = () => {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * GET /api/v1/reports/performance
   * Fetch HOD performance report with optional month & year filters
   */
  const fetchHodReport = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);

    const params = {};
    if (filters.month) params.month = filters.month;
    if (filters.year) params.year = filters.year;

    try {
      const response = await api.get('/reports/performance', { params });
      setReportData(response.data);
    } catch (err) {
      const msg = 
        err.response?.data?.message || 
        err.response?.data?.detail || 
        'Failed to load HOD performance report.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    reportData,
    report_title: reportData?.report_title || 'Monthly Performance Management Report',
    reporting_scope: reportData?.reporting_scope || 'Department',
    reporting_period: reportData?.reporting_period || '',
    period_start: reportData?.period_start || '',
    period_end: reportData?.period_end || '',
    total_staff: reportData?.total_staff || 0,
    total_tasks_assigned: reportData?.total_tasks_assigned || 0,
    total_tasks_completed: reportData?.total_tasks_completed || 0,
    total_tasks_overdue: reportData?.total_tasks_overdue || 0,
    avg_quality: reportData?.avg_quality || 0,
    avg_efficiency: reportData?.avg_efficiency || 0,
    avg_performance: reportData?.avg_performance || 0,
    unit_summaries: reportData?.unit_summaries || [],
    staff_roll: reportData?.staff_roll || [],
    isLoading,
    error,
    fetchHodReport,
  };
};