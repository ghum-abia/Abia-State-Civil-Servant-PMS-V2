import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Sidebar from '../components/Sidebar/Sidebar';
import { sidebarRoutes } from '../routes/sidebarRoutes';

const DashboardLayout = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const { pathname } = location;

  const userRole = user?.role?.toLowerCase() || 'staff';

  const getHeaderTitle = () => {
    const currentRoute = sidebarRoutes.find(route => route.path === pathname);
    if (currentRoute) return currentRoute.title;
    return pathname.split('/')[1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="min-h-screen relative bg-[#F8FAFC] font-sans flex text-slate-800 overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 lg:pl-64 flex flex-col h-screen min-w-0 overflow-hidden">
        <header className="sticky top-0 z-50 h-20 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 pl-12 lg:pl-0">
            {getHeaderTitle()}
          </h2>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;