import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authApi } from './authApi';

// Mock axios
vi.mock('axios');
vi.mock('@app/shared/api/axiosInstance', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

import axiosInstance from '@app/shared/api/axiosInstance';

// Define proper types for mocked axios
type MockedAxiosInstance = {
  post: ReturnType<typeof vi.fn>;
  get: ReturnType<typeof vi.fn>;
};

const mockedAxios = axiosInstance as unknown as MockedAxiosInstance;

describe('AuthAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('calls API with correct endpoint and credentials', async () => {
      const mockResponse = {
        data: {
          user: {
            id: 'user-123',
            email: 'test@example.com',
            name: 'Test User',
          },
          token: 'mock-token-123',
        },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await authApi.login('test@example.com', 'password123');

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('returns user and token on successful login', async () => {
      const mockData = {
        user: {
          id: 'user-456',
          email: 'user@test.com',
          name: 'User Name',
        },
        token: 'auth-token-456',
      };

      mockedAxios.post.mockResolvedValue({ data: mockData });

      const result = await authApi.login('user@test.com', 'pass');

      expect(result.user.email).toBe('user@test.com');
      expect(result.token).toBe('auth-token-456');
    });

    it('throws error on failed login', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Invalid credentials'));

      await expect(
        authApi.login('wrong@example.com', 'wrongpass')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('calls API with correct endpoint and user data', async () => {
      const mockResponse = {
        data: {
          user: {
            id: 'new-user-123',
            email: 'newuser@example.com',
            name: 'New User',
          },
          token: 'new-token-123',
        },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await authApi.register(
        'New User',
        'newuser@example.com',
        'password123'
      );

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/register', {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('returns user and token on successful registration', async () => {
      const mockData = {
        user: {
          id: 'user-789',
          email: 'registered@test.com',
          name: 'Registered User',
        },
        token: 'register-token-789',
      };

      mockedAxios.post.mockResolvedValue({ data: mockData });

      const result = await authApi.register(
        'Registered User',
        'registered@test.com',
        'password'
      );

      expect(result.user.name).toBe('Registered User');
      expect(result.token).toBe('register-token-789');
    });
  });

  describe('logout', () => {
    it('calls logout endpoint', async () => {
      mockedAxios.post.mockResolvedValue({});

      await authApi.logout();

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/logout');
    });
  });

  describe('refreshToken', () => {
    it('calls refresh token endpoint with token', async () => {
      const mockResponse = {
        data: { token: 'new-refreshed-token' },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await authApi.refreshToken('old-refresh-token');

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/refresh', {
        refreshToken: 'old-refresh-token',
      });
      expect(result.token).toBe('new-refreshed-token');
    });
  });

  describe('getMe', () => {
    it('calls get me endpoint', async () => {
      const mockUser = {
        id: 'current-user',
        email: 'current@example.com',
        name: 'Current User',
      };

      mockedAxios.get.mockResolvedValue({ data: mockUser });

      const result = await authApi.getMe();

      expect(axiosInstance.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockUser);
    });
  });
});
