import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import HomePage from '../pages/home/Home';
import Unauthorized from './Unauthourize';
import DashboardLayout from '../layouts/DashboardLayout';
import OverviewDashboard from '../pages/overviewDashboard';
import RoleGuard from './RoleGuard';

// Staff / Officer Pages
import OfficerTasks from '../pages/staff/Tasks';
import OfficerProfile from '../pages/staff/Profile';
import OfficerNotification from '../pages/staff/Notification';
import OfficerPerformance from '../pages/staff/Performance';
import OfficerReports from '../pages/staff/Reports';
import OfficerSettings from '../pages/staff/Settings';

// HOD Pages
import HODStaffs from '../pages/hod/MyStaffs';
import HODTasks from '../pages/hod/Tasks'; // Task Inbox Page
import HODTaskDetail from '../pages/hod/TaskDetail'; // <-- Newly added Task Detail Page
import HODAssign from '../pages/hod/Assign';
import HODPerformance from '../pages/hod/Performance';
import HODReports from '../pages/hod/Reports';
import HODProfile from '../pages/hod/Profile';
import HODNotification from '../pages/hod/Notification';
import ScrollToTop
 from '../components/UI/ScrollToTop';
const AppRoutes = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Dashboard Layout & Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<OverviewDashboard />} />

          {/* Officer / Staff Routes */}
          <Route element={<RoleGuard allowedRoles={['STAFF']} />}>
            <Route path="/tasks" element={<OfficerTasks />} />
            <Route path="/reports" element={<OfficerReports />} />
            <Route path="/performance" element={<OfficerPerformance />} />
            <Route path="/profile" element={<OfficerSettings />} />
          </Route>

          {/* HOD Routes */}
          <Route element={<RoleGuard allowedRoles={['HOD']} />}>
            <Route path="/mystaffs" element={<HODStaffs />} />
            <Route path="/assigntasks" element={<HODAssign />} />
            <Route path="/hodtasks" element={<HODTasks />} />
            <Route path="/hodtasks/:taskId" element={<HODTaskDetail />} /> {/* <-- Sub-route for individual task review/grading */}
            <Route path="/hodperformance" element={<HODPerformance />} />
            <Route path="/hodreports" element={<HODReports />} />
            <Route path="/hodprofile" element={<HODProfile />} />
            <Route path="/hodnotification" element={<HODNotification />} />
          </Route>

          {/* HOM Routes */}
          <Route element={<RoleGuard allowedRoles={['HOM']} />}>
            <Route path="/team-performance" element={<div className="p-6">Team Performance Page</div>} />
            <Route path="/reports" element={<div className="p-6">HOM Reports Page</div>} />
          </Route>

          {/* HOS Routes */}
          <Route element={<RoleGuard allowedRoles={['HOS']} />}>
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