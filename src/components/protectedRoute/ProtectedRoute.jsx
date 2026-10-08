import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, profile } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(profile?.pms_role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};