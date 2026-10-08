import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import HomePage from '../pages/home/Home';
import Unauthorized from './Unauthourize';
import DashboardLayout from '../layouts/DashboardLayout';
import OverviewDashboard from '../pages/overviewDashboard';
import RoleGuard from './RoleGuard';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} /> {/* <-- Root Home Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Dashboard Layout & Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<OverviewDashboard />} />

          {/* Officer Routes */}
          <Route element={<RoleGuard allowedRoles={['officer']} />}>
            <Route path="/task" element={<div className="p-6">Tasks</div>} />
            <Route path="/records" element={<div className="p-6">My Records Page</div>} />
            <Route path="/weekly-summary" element={<div className="p-6">Weekly Summary Page</div>} />
            <Route path="/drafts" element={<div className="p-6">Drafts Page</div>} />
            <Route path="/scores" element={<div className="p-6">My Scorecards Page</div>} />
            <Route path="/settings" element={<div className="p-6">Officer Settings Page</div>} />
          </Route>

          {/* HOD Routes */}
          <Route element={<RoleGuard allowedRoles={['hod']} />}>
            <Route path="/hod-supervisors" element={<div className="p-6">HOD Supervisors Page</div>} />
            <Route path="/analytics" element={<div className="p-6">Departmental Metrics Page</div>} />
            <Route path="/hod-reports" element={<div className="p-6">HOD Reports Page</div>} />
            <Route path="/hod-settings" element={<div className="p-6">HOD Settings Page</div>} />
          </Route>

          {/* HOM Routes */}
          <Route element={<RoleGuard allowedRoles={['hom']} />}>
            <Route path="/team-performance" element={<div className="p-6">Team Performance Page</div>} />
            <Route path="/reports" element={<div className="p-6">HOM Reports Page</div>} />
          </Route>

          {/* HOS Routes */}
          <Route element={<RoleGuard allowedRoles={['hos']} />}>
            <Route path="/department-heads" element={<div className="p-6">Department Heads Table</div>} />
            <Route path="/departments" element={<div className="p-6">Departments Management</div>} />
            <Route path="/statewide-audit" element={<div className="p-6">Statewide Audit Overview</div>} />
            <Route path="/compliances" element={<div className="p-6">Compliance Tracking</div>} />
            <Route path="/hos-reports" element={<div className="p-6">HOS Reports Page</div>} />
            <Route path="/hos-settings" element={<div className="p-6">HOS Settings Page</div>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;