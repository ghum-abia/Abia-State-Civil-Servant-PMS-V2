// src/layouts/DashboardLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Sidebar from '../components/Sidebar/Sidebar';
import { sidebarRoutes } from '../routes/sidebarRoutes';

const DashboardLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const getHeaderTitle = () => {
    const currentRoute = sidebarRoutes.find(route => route.path === pathname);
    if (currentRoute) return currentRoute.title;
    return pathname.split('/')[1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="min-h-screen relative bg-[#F8FAFC] font-sans flex text-slate-800 overflow-x-hidden">
      {/* Sidebar with open state control */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        <header className="sticky w-full top-0 z-40 h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger button visible only on mobile/tablet */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 lg:hidden transition-colors"
              aria-label="Open Sidebar"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-base md:text-xl font-bold text-slate-800">
              {getHeaderTitle()}
            </h2>
          </div>

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