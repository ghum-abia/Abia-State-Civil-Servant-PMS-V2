// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { sidebarRoutes } from '../../routes/sidebarRoutes.js';
import { LogOut, X } from 'lucide-react';
import Logo from '../../../public/pms_logo.jpg';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, profile } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  
  const rawRole = profile?.pms_role;
  const role = rawRole === 'officer' ? 'STAFF' : rawRole;

  const allowedRoutes = sidebarRoutes.filter(route => route.roles.includes(role));

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white text-slate-300 flex flex-col justify-between h-screen border-r border-slate-200 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:sticky lg:top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center">
              <img src={Logo} alt="PMS LOGO" className="h-12"/>
            </div>
            {/* Close button for mobile screens */}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="p-4 mt-6 space-y-2 overflow-y-auto max-h-[calc(100vh-220px)]">
            {allowedRoutes.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path + item.title}
                  to={item.path}
                  onClick={onClose} // Automatically close sidebar on mobile when a link is clicked
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#114D40] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-[rgba(11,105,63,0.26)] hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-600'} />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex group items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} className="text-red-500 group-hover:rotate-12 duration-200 ease-in-out" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;