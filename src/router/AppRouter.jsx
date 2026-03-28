import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { AuthPage } from '../pages/AuthPage';
import { VenuesPage } from '../pages/VenuesPage';
import { UserDashboard } from '../user/UserDashboard';
import { AdminDashboard } from '../admin/AdminDashboard';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';

function DefaultRedirect() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return <Navigate to={user?.role === 'Admin' ? '/admin/dashboard' : '/user/dashboard'} replace />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/venues" element={<VenuesPage />} />
      <Route element={<ProtectedRoute allowedRoles={['User']} />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="/dashboard" element={<DefaultRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
