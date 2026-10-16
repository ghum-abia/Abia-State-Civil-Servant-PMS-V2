// src/pages/hod/Assign.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssignableStaff } from '../../hooks/hod/useAssignableStaff';
import { useCreateTask } from '../../hooks/hod/useCreateTask';
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

const AssignTask = () => {
  const navigate = useNavigate();
  const { staffList, isLoading: isLoadingStaff, fetchAssignableStaff } = useAssignableStaff();
  const { createTask, isSubmitting, error: apiError } = useCreateTask();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee_id: '',
    due_date: '',
    weight: 6, 
    target_submissions: 1,
  });

  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (typeof fetchAssignableStaff === 'function') {
      fetchAssignableStaff();
    }
  }, [fetchAssignableStaff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'weight' || name === 'target_submissions' ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title || !formData.description || !formData.assignee_id || !formData.due_date) {
      setFormError('Please fill in all required fields marked with *');
      return;
    }

    const parsedDate = new Date(formData.due_date);
    if (isNaN(parsedDate.getTime())) {
      setFormError('Please provide a valid due date and time.');
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      assignee_id: formData.assignee_id,
      due_date: parsedDate.toISOString(), 
      weight: Number(formData.weight),
      target_submissions: Number(formData.target_submissions),
    };

    const result = await createTask(payload);
    if (result.success) {
      setSuccessMsg('Task successfully created and assigned!');
      // Navigate safely back to the previous screen (your HOD section) instead of an unhandled path
      setTimeout(() => navigate(-1), 1200);
    }
  };

  return (
    <div className="max-w-8xl mx-auto space-y-6 font-sans pb-12 text-slate-800 ">
      {/* Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-slate-500 mt-0.5">
            Create and assign a structured task to an officer in your department.
          </h2>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm self-start"
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      {(formError || apiError) && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl shadow-sm">
          <AlertCircle size={18} className="shrink-0" />
          <span>{formError || apiError}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl shadow-sm">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Task Specifications
            </h3>

            {/* Task Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Task Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Q3 State Audit Review"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
                required
              />
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Task Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed instructions and expectations for this task..."
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors leading-relaxed"
                required
              />
            </div>

            {/* Assign To Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Assign To Officer <span className="text-rose-500">*</span>
              </label>
              <select
                name="assignee_id"
                value={formData.assignee_id}
                onChange={handleChange}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
                required
              >
                <option value="">Select team officer...</option>
                {isLoadingStaff ? (
                  <option disabled>Loading staff directory...</option>
                ) : (
                  staffList.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.fullname || staff.email}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Weight and Target Submissions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Priority <span className="text-rose-500">*</span>
                </label>
                <select
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
                >
                  <option value={4}>Low</option>
                  <option value={6}>Medium</option>
                  <option value={8}>High</option>
                  <option value={10}>Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Target Submissions <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="target_submissions"
                  min={1}
                  value={formData.target_submissions}
                  onChange={handleChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Due Date - Time <span className="text-rose-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Assigning Task...
                </>
              ) : (
                'Assign Task'
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Information Guides */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Assignment Guide</h4>
            <ul className="text-xs text-slate-600 space-y-2.5 list-disc pl-4 leading-relaxed">
              <li>Ensure clear and comprehensive objectives are included in the description.</li>
              <li>Set realistic deadlines to avoid unnecessary overdue penalties on officer scorecards.</li>
              <li>You will receive a review prompt as soon as the officer submits their evidence.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Priority</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-100">
                <span className="font-bold text-rose-700 block">Critical</span>
                <span className="text-slate-600">Immediate high-impact executive deliverables.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100">
                <span className="font-bold text-amber-700 block">High</span>
                <span className="text-slate-600">Important, time-sensitive departmental tasks.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-sky-50/50 border border-sky-100">
                <span className="font-bold text-sky-700 block">Medium</span>
                <span className="text-slate-600">Standard operational assignments.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-700 block">Low</span>
                <span className="text-slate-600">Routine administrative duties.</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AssignTask;