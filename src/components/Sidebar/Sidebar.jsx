import React from 'react';
import {
  LayoutDashboard,
  LineChart,
  CheckSquare,
  PlusCircle,
  FileText,
  User,
  Bell,
  Settings,
  LogOut,
  Users,
  Building2,
  Activity, 
  Target,   
  BarChart2 
} from 'lucide-react';

const Sidebar = ({ role = 'staff', activeTab, setActiveTab }) => {

  const getNavItems = () => {
    switch (role) {
      case 'staff':
      case 'officer':
        return [
          { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
          { id: 'performance', label: 'My Performance', icon: LineChart },
          { id: 'tasks', label: 'Tasks', icon: CheckSquare },
          { id: 'log-task', label: 'Log Task', icon: PlusCircle },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'profile', label: 'My Profile', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ];

      case 'hod':
      case 'director':
      case 'acting-officer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'my-staff', label: 'My Staff', icon: Users },
          { id: 'tasks', label: 'Tasks', icon: CheckSquare },
          { id: 'assign-task', label: 'Assign Task', icon: PlusCircle },
          { id: 'team-performance', label: 'Team Performance', icon: LineChart },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'my-profile', label: 'My Profile', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ];

      case 'perm-sec':
      case 'dic':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'mda-performance', label: 'MDA Performance', icon: Activity },
          { id: 'departments', label: 'Departments', icon: Building2 },
          { id: 'objectives', label: 'Objectives', icon: Target },
          { id: 'kpis', label: 'KPIs', icon: BarChart2 },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'my-profile', label: 'My Profile', icon: User },
        ];

      default:
        return [
          { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        ];
    }
  };

  const navItems = getNavItems();

  // Badges & styling configuration for each civil service rank
  const roleConfig = {
    staff: { label: 'Staff / Officer', color: 'bg-emerald-100 text-emerald-800' },
    officer: { label: 'Staff / Officer', color: 'bg-emerald-100 text-emerald-800' },
    hod: { label: 'Head of Department', color: 'bg-blue-100 text-blue-800' },
    director: { label: 'Director', color: 'bg-indigo-100 text-indigo-800' },
    'perm-sec': { label: 'Permanent Secretary', color: 'bg-purple-100 text-purple-800' },
    dic: { label: 'DIC', color: 'bg-amber-100 text-amber-800' },
    'acting-officer': { label: 'Acting Officer', color: 'bg-teal-100 text-teal-800' },
  };

  const currentRoleMeta = roleConfig[role] || { label: 'Civil Servant', color: 'bg-gray-100 text-gray-800' };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between h-screen sticky top-0 shadow-sm">
      {/* Top Section */}
      <div>
        {/* App Logo & Rank Badge */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-emerald-700 text-white p-2 rounded-lg font-bold text-lg flex items-center justify-center w-10 h-10 shadow-sm">
              CS
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-xs tracking-wide uppercase">Abia State PMS</h1>
              <p className="text-[11px] text-gray-400">Civil Service V2</p>
            </div>
          </div>

          {/* Dynamic Role Badge */}
          <div className={`text-xs font-semibold px-2.5 py-1 rounded-md text-center uppercase tracking-wider ${currentRoleMeta.color}`}>
            {currentRoleMeta.label}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span className="text-left">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Settings & Logout */}
      <div className="p-4 border-t border-gray-100 space-y-1.5 bg-white">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'settings'
            ? 'bg-emerald-800 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
          <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-white' : 'text-gray-500'}`} />
          <span>Settings</span>
        </button>

        <button
          onClick={() => console.log('Logging out...')}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;