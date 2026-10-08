import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { sidebarRoutes } from '../../routes/sidebarRoutes.js';
import { LogOut, Settings as SettingsIcon } from 'lucide-react';
import Logo from '../../../public/pms_logo.jpg'

const Sidebar = () => {
  const { logout, profile } = useAuthStore();
  const location = useLocation();
  const role = profile?.pms_role?.toLowerCase() || 'officer';

  // Filter routes matching the current user's role
  const allowedRoutes = sidebarRoutes.filter(route => route.roles.includes(role));

  const roleMeta = {
    officer: { label: 'Officer', color: 'bg-emerald-100 text-emerald-800' },
    hod: { label: 'Head of Department', color: 'bg-blue-100 text-blue-800' },
    hom: { label: 'Head of Ministry', color: 'bg-indigo-100 text-indigo-800' },
    hos: { label: 'Head of Service', color: 'bg-purple-100 text-purple-800' },
  };

  const currentRoleMeta = roleMeta[role] || { label: 'Civil Servant', color: 'bg-slate-100 text-slate-800' };

{/* <div className={`text-xs font-semibold px-2.5 py-1 rounded-md text-center uppercase tracking-wider ${currentRoleMeta.color}`}>
            {currentRoleMeta.label}
          </div> */}

  return (
    <aside className="w-64 bg-[#FFFFFF] text-slate-300 flex flex-col justify-between h-screen sticky top-0 border-r border-slate-800">
      <div>
        {/* App Logo & Rank Badge */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center">
           <img src={Logo} alt="PMS LOGO" className=''/>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
          {allowedRoutes.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path + item.title}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#114D40] text-white shadow-sm'
                    : 'text-slate-400 hover:bg-[rgba(11,105,63,0.26)] hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-600'} />
                <span className={isActive ? 'text-white' : 'text-slate-600'}>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout Section */}
      <div className="p-4 border-t border-slate-800/20 bg-white">
        <button
          onClick={logout}
          className="w-full flex group items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} className="text-red-400 group-hover:rotate-12 duration-200 ease-in-out  " />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;