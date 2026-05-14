import axios from 'axios';

const API_BASE = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001') + '/api';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ulpgl_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchFaqs = () => api.get('/faqs').then(r => r.data.items);
export const fetchDomains = () => api.get('/domains').then(r => r.data.items);
export const fetchFaculties = () => api.get('/faculties').then(r => r.data.items);
export const fetchFilieres = () => api.get('/filieres').then(r => r.data.items);
export const fetchCenters = () => api.get('/centers').then(r => r.data.items);
export const fetchStaff = () => api.get('/staff').then(r => r.data.items);
export const fetchActivities = () => api.get('/activities').then(r => r.data.items);
export const fetchPosts = () => api.get('/posts').then(r => r.data.items);
export const fetchCategories = () => api.get('/categories').then(r => r.data.items);
export const fetchKeyFacts = () => api.get('/key-facts').then(r => r.data.items);

export default api;
