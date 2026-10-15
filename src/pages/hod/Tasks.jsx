// src/pages/hod/TaskInbox.jsx
import React, { useEffect, useState } from 'react';
import { useHodTasks } from '../../hooks/hod/useHodTasks';
import {
  FolderCheck,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  XCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TaskInboxPage() {
  const { tasks, isLoading, error, fetchHodTasks, deleteTask } = useHodTasks();
  const [activeTab, setActiveTab] = useState('ALL');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchHodTasks({ status: activeTab });
  }, [fetchHodTasks, activeTab]);

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setDeletingId(taskId);
      const res = await deleteTask(taskId);
      setDeletingId(null);
      if (res.success) {
        fetchHodTasks({ status: activeTab });
      }
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    switch (s) {
      case 'APPROVED':
      case 'RATED':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
            <CheckCircle2 size={12} /> Approved
          </span>
        );
      case 'SUBMITTED':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
            <Clock size={12} /> Pending Review
          </span>
        );
      case 'NEEDS_CORRECTION':
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
            <XCircle size={12} /> Needs Correction
          </span>
        );
      case 'ASSIGNED':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
            <Clock size={12} /> Assigned
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-12 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Departmental Tasks Inbox</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor, review, and evaluate staff task submissions across your department.
          </p>
        </div>
        <Link
          to="/hod/assign-task"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <Plus size={16} /> Assign New Task
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        {['ALL', 'ASSIGNED', 'SUBMITTED', 'NEEDS_CORRECTION', 'APPROVED', 'RATED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === tab
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

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Loader2 size={32} className="animate-spin text-[#0B5C35] mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading task inbox...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
          <FolderCheck size={44} className="text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No tasks found</h3>
          <p className="text-xs text-slate-400 mt-1">There are no tasks matching this filter criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Task Title</th>
                  <th className="py-3.5 px-5">Due Date</th>
                  <th className="py-3.5 px-5">Priority</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {tasks.map((task) => {
                  const isSubmitted = task.status?.toUpperCase() === 'SUBMITTED';
                  const isRated = task.status?.toUpperCase() === 'RATED';

                  return (
                    <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900 max-w-xs truncate">
                        {task.title}
                      </td>
                      <td className="py-4 px-5 text-slate-500">
                        {task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}
                      </td>
                      <td className="py-4 px-5 font-bold text-slate-700">
                        {task.weight}%
                      </td>
                      <td className="py-4 px-5">
                        {getStatusBadge(task.status)}
                      </td>
                      <td className="py-4 px-5 text-right space-x-2">
                        <Link
                          to={`/hodtasks/${task.id}`}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${isSubmitted
                              ? 'bg-[#0B5C35] hover:bg-[#09482b] text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                            }`}
                        >
                          <Eye size={13} /> {isSubmitted ? 'Review' : 'View'}
                        </Link>

                        {!isRated && (
                          <button
                            onClick={() => handleDelete(task.id)}
                            disabled={deletingId === task.id}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors"
                            title="Delete Task"
                          >
                            {deletingId === task.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}