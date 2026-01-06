import axiosInstance from '@app/shared/api/axiosInstance';
import { API_ENDPOINTS } from '@app/shared/api/endpoints';
import { User } from '../store/authStore';

interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

interface RegisterResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password }
    );
    return response.data;
  },

  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      { name, email, password }
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await axiosInstance.post<{ token: string }>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await axiosInstance.get<User>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },
};
