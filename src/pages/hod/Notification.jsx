// src/pages/Notification.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useHodTasks } from '../../hooks/hod/useHodTasks';
import Spinner from '../../components/UI/Spinner';
import { 
  AlarmClock, 
  Check, 
  RotateCcw, 
  Star, 
  ClipboardList, 
  AlertTriangle, 
  Plus, 
  Bell, 
  CheckCheck 
} from 'lucide-react';

const NotificationPage =()=> {
  const { tasks, isLoading, error, fetchHodTasks } = useHodTasks();
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'UNREAD'
  const [readNotifications, setReadNotifications] = useState({});

  useEffect(() => {
    if (typeof fetchHodTasks === 'function') {
      fetchHodTasks({ limit: 100 });
    }
  }, [fetchHodTasks]);

  // Transform tasks into dynamic notifications matching status changes
  const rawNotifications = useMemo(() => {
    if (!tasks || !Array.isArray(tasks)) return [];

    const list = [];

    tasks.forEach((task) => {
      const taskTitle = task.title || 'Untitled Task';
      const updatedTime = task.updated_at || task.created_at || new Date().toISOString();
      const formattedDate = new Date(updatedTime).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      // 1. Task Submitted
      if (task.status === 'SUBMITTED' || task.status === 'PENDING_REVIEW') {
        list.push({
          id: `submitted-${task.id}`,
          type: 'SUBMITTED',
          title: 'Task submitted for review',
          description: `Deliverables for "${taskTitle}" have been submitted and are awaiting review.`,
          timestamp: formattedDate,
          rawDate: new Date(updatedTime),
          icon: ClipboardList,
          iconBg: 'bg-amber-100 text-amber-700',
        });
      }

      // 2. Needs Correction / Returned
      if (task.status === 'NEEDS_CORRECTION' || task.status === 'REJECTED') {
        list.push({
          id: `correction-${task.id}`,
          type: 'NEEDS_CORRECTION',
          title: 'Submission returned',
          description: `Your submission for "${taskTitle}" was returned for correction.`,
          timestamp: formattedDate,
          rawDate: new Date(updatedTime),
          icon: RotateCcw,
          iconBg: 'bg-rose-100 text-rose-600',
        });
      }

      // 3. Task Approved
      if (task.status === 'APPROVED') {
        list.push({
          id: `approved-${task.id}`,
          type: 'APPROVED',
          title: 'Task approved',
          description: `Your submission for "${taskTitle}" was approved.`,
          timestamp: formattedDate,
          rawDate: new Date(updatedTime),
          icon: Check,
          iconBg: 'bg-emerald-100 text-emerald-700',
        });
      }

      // 4. Rating / Score Available
      if (task.status === 'RATED' || task.score) {
        list.push({
          id: `rated-${task.id}`,
          type: 'RATED',
          title: 'Rating available',
          description: `Your task performance score for "${taskTitle}" is now available.`,
          timestamp: formattedDate,
          rawDate: new Date(updatedTime),
          icon: Star,
          iconBg: 'bg-blue-100 text-blue-600',
        });
      }

      // 5. Newly Assigned Task
      if (task.status === 'ASSIGNED' || task.status === 'PENDING') {
        list.push({
          id: `assigned-${task.id}`,
          type: 'ASSIGNED',
          title: 'New task assigned',
          description: `"${taskTitle}" has been assigned to you.`,
          timestamp: formattedDate,
          rawDate: new Date(updatedTime),
          icon: Plus,
          iconBg: 'bg-emerald-100 text-emerald-700',
        });
      }

      // 6. Overdue / Deadline Warning
      if (task.is_overdue) {
        list.push({
          id: `overdue-${task.id}`,
          type: 'DEADLINE',
          title: 'Task deadline warning',
          description: `"${taskTitle}" is past its designated due date.`,
          timestamp: formattedDate,
          rawDate: new Date(updatedTime),
          icon: AlarmClock,
          iconBg: 'bg-amber-100 text-amber-700',
        });
      }
    });

    // Sort newest first
    return list.sort((a, b) => b.rawDate - a.rawDate);
  }, [tasks]);

  // Unread badge count
  const unreadCount = useMemo(() => {
    return rawNotifications.filter((n) => !readNotifications[n.id]).length;
  }, [rawNotifications, readNotifications]);

  // Filtered notifications based on tab toggle
  const displayedNotifications = useMemo(() => {
    if (filter === 'UNREAD') {
      return rawNotifications.filter((n) => !readNotifications[n.id]);
    }
    return rawNotifications;
  }, [rawNotifications, filter, readNotifications]);

  const toggleReadStatus = (id) => {
    setReadNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const markAllAsRead = () => {
    const allReadMap = {};
    rawNotifications.forEach((n) => {
      allReadMap[n.id] = true;
    });
    setReadNotifications(allReadMap);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 font-sans pb-12 text-slate-800">
      {/* Top Filter & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs rounded-full">
            {unreadCount} unread
          </span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                filter === 'ALL'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('UNREAD')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                filter === 'UNREAD'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unread
            </button>
          </div>

          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors px-2 py-1.5"
          >
            <CheckCheck size={16} className="text-slate-500" /> Mark all read
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl shadow-sm">
          {error}
        </div>
      )}

      {/* Main Notification Card List */}
      {isLoading ? (
        <Spinner />
      ) : displayedNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
          <Bell size={44} className="text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No notifications found</h3>
          <p className="text-xs text-slate-400 mt-1">You are all caught up with your task activity updates.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {displayedNotifications.map((notif) => {
            const Icon = notif.icon;
            const isUnread = !readNotifications[notif.id];

            return (
              <div
                key={notif.id}
                onClick={() => toggleReadStatus(notif.id)}
                className={`p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                  isUnread ? 'bg-slate-50/70 hover:bg-slate-100/60' : 'bg-white hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Round Icon Badge */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.iconBg}`}>
                    <Icon size={18} />
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{notif.description}</p>
                    <p className="text-[11px] text-slate-400 font-medium pt-1">{notif.timestamp}</p>
                  </div>
                </div>

                {/* Green Unread Indicator Dot */}
                {isUnread && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0B5C35] shrink-0 mt-1.5 shadow-sm" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default NotificationPage;