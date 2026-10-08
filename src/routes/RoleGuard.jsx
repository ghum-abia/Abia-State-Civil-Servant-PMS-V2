import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const RoleGuard = ({ allowedRoles }) => {
  const { profile } = useAuthStore();
  const profileRole = profile?.pms_role?.toLowerCase() || '';
  
  const hasAccess = allowedRoles.map(r => r.toLowerCase()).includes(profileRole);

  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default RoleGuard;