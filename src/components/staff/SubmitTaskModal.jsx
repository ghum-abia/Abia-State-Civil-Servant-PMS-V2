// src/components/Tasks/SubmitTaskModal.jsx
import React, { useState } from 'react';
import { X, UploadCloud, Loader2, AlertCircle } from 'lucide-react';

const SubmitTaskModal = ({ task, onClose, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a valid evidence file.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await onSubmit(task.id, file, notes);
    setIsSubmitting(false);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Submit Task Evidence</h3>
            <p className="text-xs text-slate-500 truncate max-w-xs mt-0.5">{task?.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* File Input Box */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Evidence Document / File <span className="text-rose-500">*</span>
            </label>
            <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl p-6 text-center transition-colors bg-slate-50/50">
              <UploadCloud size={32} className="mx-auto text-slate-400 mb-2" />
              <input
                type="file"
                required
                id="file-upload"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-xs font-bold text-[#0B5C35] hover:underline"
              >
                {file ? file.name : 'Click to select a file'}
              </label>
              <p className="text-[11px] text-slate-400 mt-1">PDF, DOCX, PNG, JPG up to 10MB</p>
            </div>
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Submission Remarks / Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide context or summary details regarding this submission..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-600 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#0B5C35] hover:bg-[#09482b] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              ) : (
                'Submit Evidence'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitTaskModal;