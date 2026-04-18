import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

const initialRegisterState = {
  fullName: '',
  email: '',
  password: '',
  role: 'User',
};

const initialLoginState = {
  email: '',
  password: '',
};

export function AuthForm() {
  const [mode, setMode] = useState('login');
  const [loginData, setLoginData] = useState(initialLoginState);
  const [registerData, setRegisterData] = useState(initialRegisterState);
  const [error, setError] = useState('');
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const redirectByRole = (role) => {
    navigate(role === 'Admin' ? '/admin/dashboard' : '/user/dashboard');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const user = await login(loginData);
      redirectByRole(user.role);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const user = await register(registerData);
      redirectByRole(user.role);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-grid container">
      <div className="auth-copy">
        <span className="badge">Single entry, role-based experience</span>
        <h1>Access the right workspace for booking or venue management</h1>
        <p>
          One authentication page handles both roles. After login, Users are routed to their
          booking dashboard and Admins are routed to the venue and booking management console.
        </p>
        <ul>
          <li>Secure JWT-based session flow</li>
          <li>User venue discovery and booking requests</li>
          <li>Admin venue CRUD and booking approvals</li>
        </ul>
      </div>

      <Card className="auth-card">
        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Login
          </button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>
            Register
          </button>
        </div>

        {error ? <div className="alert alert-error">{error}</div> : null}

        {mode === 'login' ? (
          <form className="form-grid" onSubmit={handleLogin}>
            <label>
              Username
              <input
                type="text"
                placeholder="Username"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </label>
            <Button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </Button>
          </form>
        ) : (
          <form className="form-grid" onSubmit={handleRegister}>
            <label>
              Full Name
              <input
                type="text"
                placeholder="Najm Ahmad"
                value={registerData.fullName}
                onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                placeholder="user@example.com"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder="••••••••"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
            </label>
            <label>
              Role
              <select
                value={registerData.role}
                onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </label>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
