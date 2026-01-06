export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://api.example.com';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    ME: '/auth/me',
  },
  // User endpoints
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
  },
  // Add more endpoints as needed
};
