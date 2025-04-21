'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { authAPI } from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = Cookies.get('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    
    setLoading(false);
  }, []);

  // Register user
  const register = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await authAPI.register(username, email, password);
      
      // Save user to localStorage and token to cookie
      localStorage.setItem('user', JSON.stringify(data.user));
      Cookies.set('token', data.token, { expires: 7 }); // Token expires in 7 days
      
      setUser(data.user);
      setToken(data.token);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await authAPI.login(username, password);
      
      // Save user to localStorage and token to cookie
      localStorage.setItem('user', JSON.stringify(data.user));
      Cookies.set('token', data.token, { expires: 7 }); // Token expires in 7 days
      
      setUser(data.user);
      setToken(data.token);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    Cookies.remove('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 