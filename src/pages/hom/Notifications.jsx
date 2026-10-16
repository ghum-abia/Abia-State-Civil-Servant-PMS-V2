// src/pages/hom/HomNotification.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useHOMdashboard } from '../../hooks/hom/useHOMDashboard';
import { useHodTasks } from '../../hooks/hod/useHodTasks';
import Spinner from '../../components/UI/Spinner';
import PeriodFilter from '../../components/UI/PeriodFilter';
import { 
  Bell, 
  CheckCheck, 
  Award, 
  ClipboardList, 
  Users, 
  AlertTriangle,
  Check
} from 'lucide-react';

export default function HomNotification() {
  const currentDate = new Date();
  const [period, setPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const { homData, fetchHOMDashboard, isLoading: loadingHOM } = useHOMdashboard();
  const { tasks, fetchHodTasks, isLoading: loadingTasks } = useHodTasks();

  const [filter, setFilter] = useState('ALL'); 
  const [readNotifications, setReadNotifications] = useState({});

  useEffect(() => {
    fetchHOMDashboard({ month: period.month, year: period.year });
    fetchHodTasks({ limit: 50 });
  }, [period, fetchHOMDashboard, fetchHodTasks]);

  // Derive notifications from department rankings, pending reviews, and tasks
  const rawNotifications = useMemo(() => {
    const list = [];
    const timestampNow = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // 1. Pending reviews alert for HOM
    const pendingCount = homData?.pending_reviews_count || 0;
    if (pendingCount > 0) {
      list.push({
        id: 'hom-pending-reviews',
        title: 'Pending reviews require executive sign-off',
        description: `You have ${pendingCount} departmental submission(s) awaiting your executive review and approval.`,
        timestamp: timestampNow,
        rawDate: new Date(),
        icon: ClipboardList,
        iconBg: 'bg-amber-100 text-amber-700',
      });
    }

    // 2. Department performance milestones / rankings
    const rankings = homData?.department_rankings || [];
    rankings.forEach((dept, idx) => {
      if (dept.status_flag === 'Satisfactory') {
        list.push({
          id: `dept-perf-${dept.department_id}`,
          title: `Department target achieved: ${dept.department_name}`,
          description: `"${dept.department_name}" is performing satisfactorily with an average score of ${dept.average_performance}%.`,
          timestamp: timestampNow,
          rawDate: new Date(Date.now() - idx * 3600000),
          icon: Award,
          iconBg: 'bg-emerald-100 text-[#0B5C35]',
        });
      } else if (dept.status_flag === 'Fresh Period') {
        list.push({
          id: `dept-fresh-${dept.department_id}`,
          title: `New evaluation period opened for ${dept.department_name}`,
          description: `Department metrics and staff scorecards have been initialized for the current cycle.`,
          timestamp: timestampNow,
          rawDate: new Date(Date.now() - (idx + 5) * 3600000),
          icon: Users,
          iconBg: 'bg-blue-100 text-blue-600',
        });
      }
    });

    // 3. Task status notifications
    if (Array.isArray(tasks)) {
      tasks.forEach((task) => {
        if (task.is_overdue) {
          list.push({
            id: `task-overdue-${task.id}`,
            title: 'Overdue task alert in MDA',
            description: `Task "${task.title}" has passed its designated due date without final sign-off.`,
            timestamp: new Date(task.due_date || Date.now()).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
            rawDate: new Date(task.due_date || Date.now()),
            icon: AlertTriangle,
            iconBg: 'bg-rose-100 text-rose-600',
          });
        }
      });
    }

    // Fallback sample notification if empty
    if (list.length === 0) {
      list.push({
        id: 'sample-hom-1',
        title: 'Executive performance audit generated',
        description: `Ministry-wide performance audit for ${homData?.selected_period || 'current period'} has been successfully compiled.`,
        timestamp: timestampNow,
        rawDate: new Date(),
        icon: Check,
        iconBg: 'bg-emerald-100 text-[#0B5C35]',
      });
    }

    return list.sort((a, b) => b.rawDate - a.rawDate);
  }, [homData, tasks]);

  const unreadCount = useMemo(() => {
    return rawNotifications.filter((n) => !readNotifications[n.id]).length;
  }, [rawNotifications, readNotifications]);

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

  const isLoading = loadingHOM || loadingTasks;

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-12">
      {/* Header & Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs rounded-full shadow-sm">
            {unreadCount} unread
          </span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <PeriodFilter
            month={period.month}
            year={period.year}
            onChange={(newPeriod) => setPeriod(newPeriod)}
          />

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

      {/* Notification List Container */}
      {isLoading ? (
        <div className="py-20">
          <Spinner />
        </div>
      ) : displayedNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
          <Bell size={44} className="text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No notifications found</h3>
          <p className="text-xs text-slate-400 mt-1">You are all caught up with your executive alerts.</p>
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