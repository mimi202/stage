import axios from 'axios';

/**
 * Configuration de l'API client
 * Gère l'authentification JWT et les requêtes vers le backend
 */

const API_BASE_URL = 'http://localhost:8080/api';

// Instance Axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services d'authentification
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user && user.role === 'ADMIN';
  }
};

// Services utilisateur
export const userService = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData) => api.put('/user/profile', userData),
  changePassword: (passwords) => api.put('/user/change-password', passwords),
};

// Services admin
export const adminService = {
  getAllUsers: () => api.get('/admin/users'),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getUserQuizHistory: (id) => api.get(`/admin/users/${id}/quiz-history`),
  getAllQuizResults: () => api.get('/admin/quiz-results'),
  getAllContents: () => api.get('/admin/contents'),
  deleteContent: (id) => api.delete(`/admin/contents/${id}`),
};

// Services contenu
export const contentService = {
  getAllContents: () => api.get('/content'),
  getContentsByType: (type) => api.get(`/content/type/${type}`),
  searchContents: (keyword) => api.get(`/content/search?keyword=${keyword}`),
  createContent: (contentData) => api.post('/content', contentData),
  updateContent: (id, contentData) => api.put(`/content/${id}`, contentData),
  uploadFile: (formData) => api.post('/content/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

// Services quiz
export const quizService = {
  saveResult: (resultData) => api.post('/quiz/result', resultData),
  getMyHistory: () => api.get('/quiz/history'),
  getMyStats: () => api.get('/quiz/stats'),
};

export default api;