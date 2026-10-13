// src/components/staff/TaskDetailModal.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api/api';
import { X, Award, FileText, AlertCircle, Clock, ExternalLink, Loader2 } from 'lucide-react';
import Spinner from '../UI/Spinner';

export default function TaskDetailModal({ taskId, onClose }) {
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (!taskId) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/tasks/${taskId}`);
        setTask(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load task details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  if (!taskId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white rounded-md shadow-2xl border border-slate-100 overflow-hidden my-8 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#0B5C35] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 border border-white/20 rounded-xl">
              <FileText size={22} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Task Score Card</h3>
              <p className="text-xs text-emerald-100/80 truncate max-w-md">
                {task ? task.title : 'Loading details...'}
              </p>
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
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto bg-slate-50/50">
          
          {isLoading ? <Spinner /> : error ? (
            <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          ) : task ? (
            <>
              {/* Description Section */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Description</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {task.description || 'No description provided.'}
                </p>
              </div>

              {/* Task Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">Status</p>
                  <p className="text-xs font-bold text-slate-900 mt-1">{task.status}</p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">Weight</p>
                  <p className="text-xs font-bold text-slate-900 mt-1">{task.weight}%</p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">Due Date</p>
                  <p className="text-xs font-bold text-slate-900 mt-1">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">No. of Submissions</p>
                  <p className="text-xs font-bold text-slate-900 mt-1">{task.current_submission_count}</p>
                </div>
              </div>

              {/* Correction / Rejection Reason Notice */}
              {task.last_rejection_reason && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                  <strong className="block font-bold mb-1 flex items-center gap-1.5">
                    <AlertCircle size={14} /> Correction Feedback:
                  </strong>
                  <p className="text-slate-700">{task.last_rejection_reason}</p>
                </div>
              )}

              {/* Supervisor Scorecard & Evaluation Section */}
              {task.score ? (
                <div className="p-5  border border-emerald-200/30 rounded-md space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Award size={20} className="text-[#0B5C35]" />
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">supervisor Score Remarks</h4>
                    </div>
                    <span className="bg-[#0B5C35] text-white text-[11px] font-semibold px-3 py-2 rounded-full">
                      Overall Rating: {task.score.rating} / 5
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-white border border-emerald-100 rounded-md shadow-sm">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Task Quality Score</span>
                      <span className="text-base font-bold text-slate-900 mt-0.5 block">{task.score.quality_score}%</span>
                    </div>
                    <div className="p-3 bg-white border border-emerald-100 rounded-md shadow-sm">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Task Efficiency</span>
                      <span className="text-base font-bold text-slate-900 mt-0.5 block">{task.score.efficiency_score}%</span>
                    </div>
                    <div className="p-3 bg-white border border-emerald-100 rounded-md shadow-sm">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Task Timeliness Rate</span>
                      <span className="text-base font-bold text-slate-900 mt-0.5 block">{task.score.timeline_rate}%</span>
                    </div>
                    <div className="p-3 bg-white border border-emerald-100 rounded-md shadow-sm">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Task Performance</span>
                      <span className="text-base font-bold text-emerald-800 mt-0.5 block">{task.score.task_performance}%</span>
                    </div>
                  </div>

                  {task.score.remarks && (
                    <div className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-emerald-100 shadow-sm">
                      <strong className="block font-bold text-slate-900 mb-1">Supervisor Remarks:</strong>
                      <p className="italic text-slate-600">"{task.score.remarks}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-400">
                  Scorecard evaluation is pending supervisor review.
                </div>
              )}

              {/* Submissions History List with Evidence Preview Links */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Submitted Evidence Files</h4>
                {task.submissions && task.submissions.length > 0 ? (
                  <div className="space-y-3">
                    {task.submissions.map((sub) => (
                      <div key={sub.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">Submission #{sub.submission_number}</span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock size={12} /> {new Date(sub.submitted_at).toLocaleString()}
                          </span>
                        </div>

                        {sub.notes && (
                          <p className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                            <strong className="block font-semibold text-slate-800 mb-0.5">Notes:</strong>
                            {sub.notes}
                          </p>
                        )}

                        {sub.evidence_file_url && (
                          <div className="pt-1">
                            <a 
                              href={`${sub.evidence_file_url}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 border border-emerald-200 text-[#0B5C35] rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors"
                            >
                              <ExternalLink size={14} /> View Evidence File (Submission #{sub.submission_number})
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No evidence submissions uploaded yet.</p>
                )}
              </div>
            </>
          ) : null}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0B5C35] text-white rounded-xl text-xs font-bold hover:bg-[#09482b] transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}