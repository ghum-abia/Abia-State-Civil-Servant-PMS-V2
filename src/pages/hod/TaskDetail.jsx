// src/pages/hod/TaskDetail.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHodTasks } from '../../hooks/hod/useHodTasks';
import RejectModal from '../../components/hod/RejectModal';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  Award,
  CheckSquare,
  XCircle
} from 'lucide-react';

export default function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { currentTask, isLoading, error, fetchTaskById, reviewTask, scoreTask } = useHodTasks();

  const [reviewNotes, setReviewNotes] = useState('');
  const [rating, setRating] = useState(5);
  const [scoreRemarks, setScoreRemarks] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  
  // Modal state for rejection / correction
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const loadTask = useCallback(() => {
    if (taskId) fetchTaskById(taskId);
  }, [taskId, fetchTaskById]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  const handleReview = async (action, notesOverride = null) => {
    setActionLoading(true);
    setFeedback({ type: '', message: '' });
    
    const notesToSubmit = notesOverride !== null ? notesOverride : reviewNotes;
    const res = await reviewTask(taskId, { action, review_notes: notesToSubmit });
    
    setActionLoading(false);
    if (res.success) {
      setFeedback({ type: 'success', message: `Task successfully ${action.toLowerCase()}ed!` });
      setIsRejectModalOpen(false);
      setReviewNotes('');
      loadTask();
    } else {
      setFeedback({ type: 'error', message: res.error });
    }
  };

  const handleScore = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedback({ type: '', message: '' });
    const res = await scoreTask(taskId, { rating: Number(rating), remarks: scoreRemarks });
    setActionLoading(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Task evaluated and scored successfully!' });
      loadTask();
    } else {
      setFeedback({ type: 'error', message: res.error });
    }
  };

  if (isLoading && !currentTask) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-slate-200">
        <Loader2 size={32} className="animate-spin text-[#0B5C35] mb-2" />
        <p className="text-xs text-slate-500 font-medium">Loading task submission details...</p>
      </div>
    );
  }

  if (error && !currentTask) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-xl">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const task = currentTask;
  if (!task) return null;

  const isSubmitted = task.status?.toUpperCase() === 'SUBMITTED';
  const isApproved = task.status?.toUpperCase() === 'APPROVED';
  const isRated = task.status?.toUpperCase() === 'RATED';

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans pb-12 text-slate-800">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl transition-colors shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Inbox
        </button>
      </div>

      {feedback.message && (
        <div className={`flex items-center gap-2 p-4 text-xs rounded-xl border ${feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
          {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Task Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 text-[11px] font-bold rounded-full bg-emerald-50 text-[#0B5C35] border border-emerald-200 mb-2">
              Status: {task.status}
            </span>
            <h2 className="text-xl font-bold text-slate-900">{task.title}</h2>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Task Weight</p>
            <p className="text-2xl font-black text-[#0B5C35]">{task.weight}%</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
          <span className="font-bold text-slate-700 block mb-1">Description:</span>
          {task.description || 'No description provided.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={15} className="text-slate-400" />
            <span>Due: {new Date(task.due_date).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <FileText size={15} className="text-slate-400" />
            <span>Target Submissions: {task.target_submissions}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock size={15} className="text-slate-400" />
            <span>Current Submissions: {task.current_submission_count}</span>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <FileText size={16} className="text-[#0B5C35]" /> Submissions ({task.submissions?.length || 0})
        </h3>

        <div className="space-y-4">
          {task.submissions && task.submissions.length > 0 ? (
            task.submissions.map((sub, index) => (
              <div key={sub.id} className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Submission #{sub.submission_number || index + 1}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {new Date(sub.submitted_at).toLocaleString()}
                  </span>
                </div>
                {sub.notes && (
                  <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                    <strong>Officer Notes:</strong> {sub.notes}
                  </p>
                )}
                {sub.evidence_file_url && (
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-xs font-mono text-slate-600 truncate max-w-md">
                      {sub.evidence_file_url}
                    </span>
                    <a
                      href={`${sub.evidence_file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-lg text-xs font-bold transition-all shrink-0"
                    >
                      View Evidence <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 py-4 text-center">No submissions made yet.</p>
          )}
        </div>
      </div>

      {/* Action 1: Review Section (Approve directly or open modal for REJECT) */}
      {isSubmitted && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <CheckSquare size={16} className="text-[#0B5C35]" /> Review Submission
          </h3>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Approval Notes</label>
            <textarea
              rows={2}
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Provide notes if approving..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleReview('APPROVE')}
              disabled={actionLoading}
              className="px-5 py-2.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} Approve Task
            </button>
            <button
              onClick={() => setIsRejectModalOpen(true)}
              disabled={actionLoading}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <XCircle size={14} /> Request Correction
            </button>
          </div>
        </div>
      )}

      {/* Action 2: Scoring Section (If APPROVED) */}
      {isApproved && (
        <form onSubmit={handleScore} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Award size={16} className="text-[#0B5C35]" />Score Approved Task
          </h3>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Rating (1 to 5 Stars)</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
            >
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Satisfactory</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Evaluation Remarks</label>
            <textarea
              rows={3}
              value={scoreRemarks}
              onChange={(e) => setScoreRemarks(e.target.value)}
              placeholder="Provide final evaluation remarks..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
            />
          </div>
          <button
            type="submit"
            disabled={actionLoading}
            className="px-6 py-2.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <Award size={14} />} Submit Final Score
          </button>
        </form>
      )}

      {/* Score Summary (If RATED) */}
      {isRated && task.score && (
        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-[#0B5C35] uppercase tracking-wider flex items-center gap-2">
            <Award size={18} /> Evaluation & Performance Score
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-emerald-100">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Rating Scale</p>
              <p className="text-lg font-black text-slate-900">{task.score.rating} / 5</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Quality Score</p>
              <p className="text-lg font-black text-blue-600">{task.score.quality_score}%</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Efficiency Score</p>
              <p className="text-lg font-black text-amber-600">{task.score.efficiency_score}%</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Final Performance</p>
              <p className="text-lg font-black text-[#0B5C35]">{task.score.task_performance}%</p>
            </div>
          </div>
          {task.score.remarks && (
            <div className="bg-white p-4 rounded-xl border border-emerald-100 text-xs text-slate-700">
              <strong className="text-slate-900 block mb-1">HOD Remarks:</strong>
              {task.score.remarks}
            </div>
          )}
        </div>
      )}

      {/* Rejection Modal Component */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={(notes) => handleReview('REJECT', notes)}
        isLoading={actionLoading}
      />
    </div>
  );
}