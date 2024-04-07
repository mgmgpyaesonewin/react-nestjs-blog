import axios from 'axios';

const baseURL = 'http://localhost:3000';

const setAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const fetcher = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: any) => {
  setAuthHeader();
  return axios({
    method,
    url: baseURL + url,
    data,
  });
};

export const login = async (email: string, password: string) => {
  const response = await fetcher('/auth/login', 'POST', { email, password });
  localStorage.setItem('token', response.data.access_token);
  return response;
};

export const register = async (username: string, email: string, password: string) => fetcher('/auth/register', 'POST', { username, email, password });
