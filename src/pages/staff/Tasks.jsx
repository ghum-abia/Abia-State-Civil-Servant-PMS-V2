// src/pages/staff/Tasks.jsx
import React, { useEffect, useState } from 'react';
import { useStaffTasks } from '../../hooks/staff/useStaffTasks';
import SubmitTaskModal from '../../components/staff/SubmitTaskModal';
import TaskDetailModal from '../../components/staff/TaskDetailModal';
import Spinner from '../../components/UI/Spinner';
import { 
  FolderCheck, 
  Calendar, 
  Upload, 
  Eye, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  Clock, 
  XCircle 
} from 'lucide-react';

const StaffTasksPage = () => {
  const { tasks, isLoading, error, fetchTasks, submitTaskEvidence } = useStaffTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailTaskId, setDetailTaskId] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Status Badge Mapping matching backend enums
  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    switch (s) {
      case 'APPROVED':
      case 'RATED':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-semibold">
            <CheckCircle2 size={12} /> Approved
          </span>
        );
      case 'SUBMITTED':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-md text-[11px] font-semibold">
            <Clock size={12} /> Submitted
          </span>
        );
      case 'NEEDS_CORRECTION':
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-md text-[11px] font-semibold">
            <XCircle size={12} /> Needs Correction
          </span>
        );
      case 'ASSIGNED':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] font-semibold">
            <Clock size={12} /> Assigned
          </span>
        );
    }
  };

  // Filter tasks based on active status tab
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 'ALL') return true;
    const taskStatus = task.status?.toUpperCase();
    if (activeTab === 'APPROVED') {
      return taskStatus === 'APPROVED' || taskStatus === 'RATED';
    }
    if (activeTab === 'NEEDS_CORRECTION') {
      return taskStatus === 'NEEDS_CORRECTION' || taskStatus === 'REJECTED';
    }
    return taskStatus === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Task Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            View assigned civil service assignments and submit completion evidence.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        {['ALL', 'ASSIGNED', 'SUBMITTED', 'NEEDS_CORRECTION', 'APPROVED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#0B5C35] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab === 'ALL'
              ? 'All Tasks'
              : tab === 'NEEDS_CORRECTION'
              ? 'Needs Correction'
              : tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Error View */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? <Spinner /> : filteredTasks.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-slate-200 text-center">
          <FolderCheck size={40} className="text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No tasks found</h3>
          <p className="text-xs text-slate-400 mt-1">There are no tasks matching this filter criteria.</p>
        </div>
      ) : (
        /* Tasks Grid / List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => {
            const isApproved = task.status?.toUpperCase() === 'APPROVED' || task.status?.toUpperCase() === 'RATED';
            return (
              <div
                key={task.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{task.title}</h3>
                    {getStatusBadge(task.status)}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {task.description || 'No detailed description provided.'}
                  </p>

                  {/* Task Metadata */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-400" />
                        Due Date:
                      </span>
                      <span className="font-semibold text-slate-700">
                        {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Task Priority:</span>
                      <span className="font-bold text-slate-800">
                    {task.weight > 0 && task.weight <=4 ? 'Low' 
                  : task.weight > 4 && task.weight <=6 ? 'Medium' 
                  :task.weight > 6 && task.weight <=8 ? 'High' 
                  :task.weight > 8  ? 'Critical' : 'None'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Submissions:</span>
                      <span className="font-bold text-slate-800">
                        {task.current_submission_count || 0} / {task.target_submissions || 1}
                      </span>
                    </div>
                  </div>

                  {/* Rejection/Correction Reason notice if applicable */}
                  {(task.status?.toUpperCase() === 'NEEDS_CORRECTION' || task.status?.toUpperCase() === 'REJECTED') && task.last_rejection_reason && (
                    <div className="mt-3 p-2.5 bg-amber-50 border border-amber-100 rounded-lg text-[11px] text-amber-800">
                      <strong className="block font-semibold">Reasons:</strong>
                      {task.last_rejection_reason}
                    </div>
                  )}
                </div>

                {/* Actions Section */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => setDetailTaskId(task.id)}
                    className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye size={14} /> View
                  </button>

                  <button
                    onClick={() => setSelectedTask(task)}
                    disabled={isApproved}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isApproved
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-[#0B5C35] hover:bg-[#09482b] text-white shadow-sm'
                    }`}
                  >
                    <Upload size={14} />
                    {task.status?.toUpperCase() === 'SUBMITTED' ? 'Resubmit' : task.status?.toUpperCase() === 'NEEDS_CORRECTION' ? 'Correct' : 'Submit'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Evidence Submission Modal */}
      {selectedTask && (
        <SubmitTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSubmit={submitTaskEvidence}
        />
      )}

      {/* Detailed Task & Scorecard Modal with API Fetch */}
      {detailTaskId && (
        <TaskDetailModal
          taskId={detailTaskId}
          onClose={() => setDetailTaskId(null)}
        />
      )}
    </div>
  );
};

export default StaffTasksPage;