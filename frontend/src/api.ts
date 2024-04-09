import axios from 'axios';

const baseURL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => response, (error) => {
  try {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  } catch (err) {
    console.error(err);
  }
  return Promise.reject(error);
});

export const fetcher = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: any) => axiosInstance({
    method,
    url: baseURL + url,
    data,
  });

export const login = async (email: string, password: string) => {
  const response = await fetcher('/auth/login', 'POST', { email, password });
  localStorage.setItem('token', response.data.access_token);
  return response;
};

export const register = async (username: string, email: string, password: string) => fetcher('/auth/register', 'POST', { username, email, password });
