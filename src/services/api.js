import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://amit-yadav-nk1z.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects
export const getProjects = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/projects?${params}`);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// Skills
export const getSkills = async (category = '') => {
  const response = await api.get(`/skills${category ? `?category=${category}` : ''}`);
  return response.data;
};

// Experience
export const getExperience = async (type = '') => {
  const response = await api.get(`/experience${type ? `?type=${type}` : ''}`);
  return response.data;
};

// Contact
export const submitContact = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

export default api;
