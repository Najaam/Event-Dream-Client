import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('edv_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('edv_token'));
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(Boolean(localStorage.getItem('edv_token')));

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const response = await authService.getProfile();
        setUser(response.data);
        localStorage.setItem('edv_user', JSON.stringify(response.data));
      } catch (error) {
        logout();
      } finally {
        setInitializing(false);
      }
    };

    bootstrap();
  }, [token]);

  const persistSession = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem('edv_user', JSON.stringify(payload.user));
    localStorage.setItem('edv_token', payload.token);
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      persistSession(response.data);
      return response.data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const response = await authService.register(payload);
      persistSession(response.data);
      return response.data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('edv_user');
    localStorage.removeItem('edv_token');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      initializing,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
    }),
    [user, token, loading, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
