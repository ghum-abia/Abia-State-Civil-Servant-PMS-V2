// src/hooks/hod/useCreateTask.js
import { useState, useCallback } from 'react';
import api from '../../services/api/api';

export const useCreateTask = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createTask = useCallback(async (formData) => {
    setIsSubmitting(true);
    setError(null);

    // Map priority dropdown to integer weight
    const priorityWeightMap = {
      Low: 4,
      Medium: 6,
      High: 8,
      Critical: 10,
    };

    const weight = priorityWeightMap[formData.priority] || 6;

    // Build comprehensive description containing optional output/remarks
    const descriptionParts = [formData.description];
    if (formData.expected_output) {
      descriptionParts.push(`\n\nExpected Output: ${formData.expected_output}`);
    }
    if (formData.remarks) {
      descriptionParts.push(`\nRemarks: ${formData.remarks}`);
    }

    // Exact backend payload matching Swagger schema
    const payload = {
      title: formData.title,
      description: descriptionParts.join('').trim(),
      assignee_id: formData.assignee_id,
      due_date: new Date(formData.deadline).toISOString(),
      weight: Number(weight),
      target_submissions: Number(formData.target_submissions || 1),
    };

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