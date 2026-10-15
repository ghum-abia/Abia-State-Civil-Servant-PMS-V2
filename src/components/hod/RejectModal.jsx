// src/components/hod/RejectModal.jsx
import React, { useState } from 'react';
import { X, XCircle, Loader2 } from 'lucide-react';

export default function RejectModal({ isOpen, onClose, onSubmit, isLoading }) {
  const [reviewNotes, setReviewNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewNotes.trim()) return;
    onSubmit(reviewNotes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-rose-600">
            <XCircle size={20} />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Request Task Correction
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Reasons <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="e.g. TRY AGAIN, TESTING REJECTION..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500 leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              This note will be sent to the officer explaining why corrections are needed.
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !reviewNotes.trim()}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Processing...
                </>
              ) : (
                'Confirm Rejection'
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}