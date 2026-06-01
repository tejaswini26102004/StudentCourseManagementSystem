import axios from 'axios';

// Backend API base URL
const API_URL = 'http://localhost:5164/api';

// Helper to get JWT token headers
const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

// Register new user
export const register = (data) => axios.post(`${API_URL}/auth/register`, data);

// Login and get token
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

// Save user info after login
export const saveUser = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('name', data.name);
    localStorage.setItem('userId', data.userId);
};

// Get user info
export const getRole = () => localStorage.getItem('role');
export const getName = () => localStorage.getItem('name');
export const getUserId = () => localStorage.getItem('userId');
export const getToken = () => localStorage.getItem('token');
export const isLoggedIn = () => localStorage.getItem('token') !== null;

// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
};

export { getHeaders, API_URL };