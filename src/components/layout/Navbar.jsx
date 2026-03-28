import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CalendarDays, LogOut, Shield, UserCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <div className="brand-badge">
            <CalendarDays size={18} />
          </div>
          <div>
            <strong>Elite Dream</strong>
            <span>Venue Booking</span>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/venues">Venues</NavLink>
          {isAuthenticated && user?.role === 'User' ? <NavLink to="/user/dashboard">My Dashboard</NavLink> : null}
          {isAuthenticated && user?.role === 'Admin' ? <NavLink to="/admin/dashboard">Admin Panel</NavLink> : null}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <div className="user-chip">
                {user?.role === 'Admin' ? <Shield size={16} /> : <UserCircle2 size={16} />}
                <span>{user?.fullName}</span>
              </div>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate('/auth')}>Login / Register</Button>
          )}
        </div>
      </div>
    </header>
  );
}
