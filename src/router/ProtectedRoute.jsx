import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/common/Loader';

export function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user, initializing } = useAuth();

  if (initializing) {
    return <Loader label="Preparing workspace..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={user?.role === 'Admin' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }

  return <Outlet />;
}
