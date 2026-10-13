// src/components/Performance/TaskScoreModal.jsx
import React from 'react';
import { X, Award, CheckCircle2, User, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';
const TaskScoreModal = ({ scoreData, onClose }) => {
  if (!scoreData) return null;

  const {
    task_title,
    final_rating,
    task_performance,
    task_quality,
    task_efficiency,
    rating_value,
    submissions,
    corrections,
    approved_by,
    approval_date,
    remarks,
  } = scoreData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#0B5C35] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 border border-white/20 rounded-xl">
              <Award size={22} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Task Score Summary</h3>
              <p className="text-xs text-emerald-100/80 truncate max-w-xs">{task_title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Main Score & Final Rating Badge */}
          <div className="flex items-center justify-between p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Overall Performance Score
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-0.5">
                {task_performance ?? 0}%
              </h2>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#0B5C35] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wide">
                {final_rating || 'Evaluated'}
              </span>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">
                Rating Value: {rating_value ?? 'N/A'} / 5
              </p>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-xs text-slate-500 font-semibold">Task Quality</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{task_quality ?? 0}%</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-xs text-slate-500 font-semibold">Task Efficiency</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{task_efficiency ?? 0}%</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-xs text-slate-500 font-semibold">Submissions</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{submissions ?? 0}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-xs text-slate-500 font-semibold">Corrections</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{corrections ?? 0}</p>
            </div>
          </div>

          {/* Supervisor Remarks */}
          {remarks && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Supervisor Remarks:</span>
              <p className="leading-relaxed text-slate-600">{remarks}</p>
            </div>
          )}

          {/* Approval Details */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-slate-400" />
                Evaluated / Approved By:
              </span>
              <span className="font-semibold text-slate-800">{approved_by || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-slate-400" />
                Approval Date:
              </span>
              <span className="font-semibold text-slate-800">
                {approval_date ? new Date(approval_date).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0B5C35] text-white rounded-xl text-xs font-bold hover:bg-[#09482b] transition-colors"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskScoreModal;