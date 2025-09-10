import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: Initializing...');
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log('AuthContext: User found from token:', decoded);
      } catch (error) {
        console.error('AuthContext: Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('AuthContext: Attempting login for:', email);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (!res.data.token) {
        throw new Error('No token received from server');
      }
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser(decoded);
      console.log('AuthContext: Login successful. User:', decoded);
      return decoded; // Return user data for role-based redirection
    } catch (err) {
      console.error('AuthContext: Login failed:', err.response?.data || err.message);
      throw new Error(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  const register = async (username, email, password, role) => {
    console.log('AuthContext: Attempting registration for:', email);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password, role });
      console.log('AuthContext: Registration successful, now logging in...');
      // After successful registration, automatically login
      const loginRes = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', loginRes.data.token);
      const decoded = jwtDecode(loginRes.data.token);
      setUser(decoded);
      console.log('AuthContext: Registration and login successful. User:', decoded);
      return decoded; // Return user data for role-based redirection
    } catch (err) {
      console.error('AuthContext: Registration failed:', err);
      throw err;
    }
  };

  const logout = () => {
    console.log('AuthContext: Logging out user.');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;