import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';

// Import your role-specific dashboard views as needed
import OfficerDashboardView from '../pages/staff/Dashboard';
// import HodDashboardView from './Hod/HodDashboard';
// import HomDashboardView from './Hom/HomDashboard';
// import HosDashboardView from './Hos/HosDashboard';

const OverviewDashboard = () => {
  const profile = useAuthStore((state) => state.profile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    if (isAuthenticated && !profile) {
      setIsHydrating(true);
    } else {
      setIsHydrating(false);
    }
  }, [profile, isAuthenticated]);

  if (isHydrating) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-500">Loading Portal...</p>
        </div>
      </div>
    );
  }

  const profileRole = profile?.pms_role?.toLowerCase();

  switch (profileRole) {
    case 'hos':
      return <div className="p-6"><h1 className="text-2xl font-bold">Head of Service (HOS) Dashboard</h1></div>; // Replace with <HosDashboardView />
    case 'hom':
      return <div className="p-6"><h1 className="text-2xl font-bold">Head of Ministry (HOM) Dashboard</h1></div>; // Replace with <HomDashboardView />
    case 'hod':
      return <div className="p-6"><h1 className="text-2xl font-bold">Head of Department (HOD) Dashboard</h1></div>; // Replace with <HodDashboardView />
    case 'staff':
    default:
      return <div className="p-6"><h1 className="text-2xl font-bold">Officer Dashboard</h1></div>; // Replace with <OfficerDashboardView />
  }
};

export default OverviewDashboard;