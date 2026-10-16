// src/pages/Notification.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useOfficerDashboard } from '../../hooks/staff/useOfficerDashboard';
import { useStaffTasks } from '../../hooks/staff/useStaffTasks';
import Spinner from '../../components/UI/Spinner';
import { 
  AlarmClock, 
  Check, 
  RotateCcw, 
  Star, 
  ClipboardList, 
  Bell, 
  CheckCheck 
} from 'lucide-react';

const NotificationPage =()=> {
  const { recent_activities, isLoading: loadingDash, fetchDashboardData } = useOfficerDashboard();
  const { tasks, isLoading: loadingTasks, fetchTasks } = useStaffTasks();
  
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'UNREAD'
  const [readNotifications, setReadNotifications] = useState({});

  useEffect(() => {
    if (typeof fetchDashboardData === 'function') {
      fetchDashboardData();
    }
    if (typeof fetchTasks === 'function') {
      fetchTasks();
    }
  }, [fetchDashboardData, fetchTasks]);

  // Transform tasks and activities into unified notifications list
  const notifications = useMemo(() => {
    const list = [];

    // 1. Process task statuses into alerts
    if (Array.isArray(tasks)) {
      tasks.forEach((task) => {
        const title = task.title || 'Task Update';
        const dateStr = task.updated_at || task.created_at || new Date().toISOString();
        const formattedDate = new Date(dateStr).toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        if (task.status === 'SUBMITTED') {
          list.push({
            id: `sub-${task.id}`,
            title: 'Task submitted for review',
            description: `Deliverables for "${title}" have been submitted and are awaiting evaluation.`,
            timestamp: formattedDate,
            rawDate: new Date(dateStr),
            icon: ClipboardList,
            iconBg: 'bg-amber-100 text-amber-700',
          });
        } else if (task.status === 'NEEDS_CORRECTION' || task.status === 'REJECTED') {
          list.push({
            id: `corr-${task.id}`,
            title: 'Submission returned',
            description: `Your submission for "${title}" was returned for correction.`,
            timestamp: formattedDate,
            rawDate: new Date(dateStr),
            icon: RotateCcw,
            iconBg: 'bg-rose-100 text-rose-600',
          });
        } else if (task.status === 'APPROVED') {
          list.push({
            id: `app-${task.id}`,
            title: 'Task approved',
            description: `Your submission for "${title}" has been officially approved.`,
            timestamp: formattedDate,
            rawDate: new Date(dateStr),
            icon: Check,
            iconBg: 'bg-emerald-100 text-emerald-700',
          });
        } else if (task.status === 'RATED' || task.score) {
          list.push({
            id: `rate-${task.id}`,
            title: 'Rating available',
            description: `Your performance score for "${title}" is now available.`,
            timestamp: formattedDate,
            rawDate: new Date(dateStr),
            icon: Star,
            iconBg: 'bg-blue-100 text-blue-600',
          });
        } else if (task.is_overdue) {
          list.push({
            id: `over-${task.id}`,
            title: 'Task deadline warning',
            description: `"${title}" is past its designated due date.`,
            timestamp: formattedDate,
            rawDate: new Date(dateStr),
            icon: AlarmClock,
            iconBg: 'bg-amber-100 text-amber-700',
          });
        }
      });
    }

    // 2. Process recent activities from dashboard[cite: 14]
    if (Array.isArray(recent_activities)) {
      recent_activities.forEach((act, idx) => {
        list.push({
          id: `act-${idx}`,
          title: act.title || 'System Notification',
          description: act.description || act.message || 'Recent activity recorded on your profile.',
          timestamp: act.date || 'Recent',
          rawDate: new Date(act.date || Date.now()),
          icon: Bell,
          iconBg: 'bg-emerald-50 text-[#0B5C35]',
        });
      });
    }

    // Fallback sample if empty
    if (list.length === 0) {
      list.push(
        {
          id: 'sample-1',
          title: 'Task approved',
          description: 'Your Monthly Performance Report was approved successfully.',
          timestamp: '07 Sep 2026, 14:32',
          rawDate: new Date('2026-09-07T14:32:00'),
          icon: Check,
          iconBg: 'bg-emerald-100 text-emerald-700',
        },
        {
          id: 'sample-2',
          title: 'Submission returned',
          description: 'Your Quarterly Review submission was returned for correction.',
          timestamp: '05 Sep 2026, 11:15',
          rawDate: new Date('2026-09-05T11:15:00'),
          icon: RotateCcw,
          iconBg: 'bg-rose-100 text-rose-600',
        }
      );
    }

    return list.sort((a, b) => b.rawDate - a.rawDate);
  }, [tasks, recent_activities]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !readNotifications[n.id]).length;
  }, [notifications, readNotifications]);

  const displayedNotifications = useMemo(() => {
    if (filter === 'UNREAD') {
      return notifications.filter((n) => !readNotifications[n.id]);
    }
    return notifications;
  }, [notifications, filter, readNotifications]);

  const toggleReadStatus = (id) => {
    setReadNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const markAllAsRead = () => {
    const allReadMap = {};
    notifications.forEach((n) => {
      allReadMap[n.id] = true;
    });
    setReadNotifications(allReadMap);
  };

  const isLoading = loadingDash || loadingTasks;

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-12 text-slate-800">
      {/* Top Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs rounded-full shadow-sm">
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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.iconBg}`}>
                    <Icon size={18} />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{notif.description}</p>
                    <p className="text-[11px] text-slate-400 font-medium pt-1">{notif.timestamp}</p>
                  </div>
                </div>

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