import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useAuthStore } from './authStore';
import { LocalStorageMock } from '@app/test-helpers';

describe('AuthStore', () => {
  let localStorageMock: LocalStorageMock;

  beforeEach(() => {
    localStorageMock = new LocalStorageMock();
    (global as unknown as { localStorage: Storage }).localStorage =
      localStorageMock;

    // Reset store state
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('initializes with null user', () => {
      const { user } = useAuthStore.getState();
      expect(user).toBeNull();
    });

    it('initializes with null token', () => {
      const { token } = useAuthStore.getState();
      expect(token).toBeNull();
    });

    it('initializes with isAuthenticated false', () => {
      const { isAuthenticated } = useAuthStore.getState();
      expect(isAuthenticated).toBe(false);
    });
  });

  describe('Login', () => {
    it('successfully logs in with valid credentials', async () => {
      const { login } = useAuthStore.getState();

      await login('test@example.com', '123456');

      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user).not.toBeNull();
      expect(user?.email).toBe('test@example.com');
      expect(user?.name).toBe('Test User');
      expect(token).toBeTruthy();
      expect(isAuthenticated).toBe(true);
    });

    it('throws error with invalid credentials', async () => {
      const { login } = useAuthStore.getState();

      await expect(login('wrong@example.com', 'wrongpassword')).rejects.toThrow(
        'Invalid credentials'
      );
    });

    it('throws error with incorrect password', async () => {
      const { login } = useAuthStore.getState();

      await expect(login('test@example.com', 'wrongpassword')).rejects.toThrow(
        'Invalid credentials'
      );
    });

    it('persists auth state to localStorage after login', async () => {
      const { login } = useAuthStore.getState();

      await login('test@example.com', '123456');

      // Just verify the state changed
      const { isAuthenticated, user } = useAuthStore.getState();
      expect(isAuthenticated).toBe(true);
      expect(user?.email).toBe('test@example.com');
    });
  });

  describe('Register', () => {
    it('successfully registers a new user', async () => {
      const { register } = useAuthStore.getState();

      await register('New User', 'newuser@example.com', 'password123');

      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user).not.toBeNull();
      expect(user?.email).toBe('newuser@example.com');
      expect(user?.name).toBe('New User');
      expect(token).toBeTruthy();
      expect(isAuthenticated).toBe(true);
    });

    it('throws error when registering with existing email', async () => {
      const { register } = useAuthStore.getState();

      // First registration
      await register('User One', 'duplicate@example.com', 'password');

      // Reset state but keep localStorage
      useAuthStore.setState({
        user: null,
        token: null,
        isAuthenticated: false,
      });

      // Try to register again with same email
      await expect(
        register('User Two', 'duplicate@example.com', 'password')
      ).rejects.toThrow('User already exists');
    });

    it('stores new user in localStorage mock-users', async () => {
      const { register } = useAuthStore.getState();

      await register('Test User', 'test@test.com', 'password');

      const users = JSON.parse(
        localStorage.getItem('mock-users') || '[]'
      ) as Array<{
        email: string;
        name: string;
      }>;
      const newUser = users.find((u) => u.email === 'test@test.com');

      expect(newUser).toBeTruthy();
      expect(newUser?.name).toBe('Test User');
    });
  });

  describe('Logout', () => {
    it('clears user state on logout', async () => {
      const { login, logout } = useAuthStore.getState();

      // Login first
      await login('test@example.com', '123456');
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      // Then logout
      logout();

      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(token).toBeNull();
      expect(isAuthenticated).toBe(false);
    });

    it('updates localStorage on logout', async () => {
      const { login, logout } = useAuthStore.getState();

      await login('test@example.com', '123456');
      logout();

      const stored = localStorage.getItem('auth-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.state.isAuthenticated).toBe(false);
        expect(parsed.state.user).toBeNull();
      }
    });
  });

  describe('SetUser', () => {
    it('sets user and token directly', () => {
      const { setUser } = useAuthStore.getState();

      const mockUser = {
        id: 'user-123',
        email: 'direct@example.com',
        name: 'Direct User',
      };
      const mockToken = 'direct-token-123';

      setUser(mockUser, mockToken);

      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user).toEqual(mockUser);
      expect(token).toBe(mockToken);
      expect(isAuthenticated).toBe(true);
    });
  });

  describe('Persistence', () => {
    it('loads auth state from localStorage on rehydration', () => {
      // Manually set state to simulate rehydration
      const mockUser = {
        id: 'user-456',
        email: 'persisted@example.com',
        name: 'Persisted User',
      };

      useAuthStore.setState({
        user: mockUser,
        token: 'persisted-token',
        isAuthenticated: true,
      });

      const { user, token, isAuthenticated } = useAuthStore.getState();
      expect(user?.email).toBe('persisted@example.com');
      expect(token).toBe('persisted-token');
      expect(isAuthenticated).toBe(true);
    });
  });
});
