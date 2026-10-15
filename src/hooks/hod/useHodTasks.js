// src/hooks/hod/useHodTasks.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useHodTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * GET /api/v1/tasks
   * List and filter tasks accessible to the HOD
   */
  const fetchHodTasks = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);

    const params = {};
    if (filters.status && filters.status !== 'ALL') {
      params.status = filters.status;
    }
    if (filters.assignee_id) {
      params.assignee_id = filters.assignee_id;
    }
    if (typeof filters.is_overdue === 'boolean') {
      params.is_overdue = filters.is_overdue;
    }
    params.skip = filters.skip || 0;
    params.limit = filters.limit || 50;

    try {
      const response = await api.get('/tasks', { params });
      const taskList = Array.isArray(response.data)
        ? response.data
        : response.data?.tasks || [];
      setTasks(taskList);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          'Failed to load departmental tasks.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * GET /api/v1/tasks/{task_id}
   * Fetch single task details including submissions array and score object
   */
  const fetchTaskById = useCallback(async (taskId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/tasks/${taskId}`);
      setCurrentTask(response.data);
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.detail || 'Failed to load task details.';
      setError(msg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * POST /api/v1/tasks
   * Create and assign a new task
   */
  const createHodTask = useCallback(async (taskData) => {
    setIsLoading(true);
    setError(null);

    const priorityWeightMap = {
      Low: 4,
      Medium: 6,
      High: 8,
      Critical: 10,
    };

    const weight = priorityWeightMap[taskData.priority] || 6;
    const descriptionParts = [taskData.description];
    if (taskData.expected_output) {
      descriptionParts.push(`\n\nExpected Output: ${taskData.expected_output}`);
    }
    if (taskData.remarks) {
      descriptionParts.push(`\nRemarks: ${taskData.remarks}`);
    }

    const payload = {
      title: taskData.title,
      description: descriptionParts.join('').trim(),
      assignee_id: taskData.assignee_id,
      due_date: new Date(taskData.deadline).toISOString(),
      weight: Number(weight),
      target_submissions: Number(taskData.target_submissions || 1),
    };

    try {
      const response = await api.post('/tasks', payload);
      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.detail || 'Failed to assign task.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * POST /api/v1/tasks/{task_id}/review
   * Reviews a submitted task (APPROVE or REJECT / NEEDS_CORRECTION)
   * Body: { action: "APPROVE" | "REJECT", review_notes: string }
   */
  const reviewTask = useCallback(async (taskId, { action, review_notes }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post(`/tasks/${taskId}/review`, {
        action,
        review_notes,
      });
      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.detail || 'Failed to submit review.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * POST /api/v1/tasks/{task_id}/score
   * Rates and auto-scores an approved task
   * Body: { rating: number (1-5), remarks: string }
   */
  const scoreTask = useCallback(async (taskId, { rating, remarks }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post(`/tasks/${taskId}/score`, {
        rating: Number(rating),
        remarks,
      });
      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.detail || 'Failed to score task.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * DELETE /api/v1/tasks/{task_id}
   * Deletes an unrated task
   */
  const deleteTask = useCallback(async (taskId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.detail || 'Failed to delete task.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tasks,
    currentTask,
    isLoading,
    error,
    fetchHodTasks,
    fetchTaskById,
    createHodTask,
    reviewTask,
    scoreTask,
    deleteTask,
  };
};