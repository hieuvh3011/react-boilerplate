import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Mock authentication - replace with real API call
        // const response = await authApi.login(email, password);

        // Simulate API call
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });

        // Mock validation
        let users = JSON.parse(localStorage.getItem('mock-users') || '[]');

        // Seed default test account if no users exist
        if (users.length === 0) {
          users = [
            {
              id: 'user-default',
              name: 'Test User',
              email: 'test@example.com',
              password: '123456', // In real app, never store plain password
            },
          ];
          localStorage.setItem('mock-users', JSON.stringify(users));
        }

        const user = users.find(
          (u: { email: string; password: string }) =>
            u.email === email && u.password === password
        );

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const mockUser: User = {
          id: user.id,
          email: user.email,
          name: user.name,
        };

        const mockToken = `mock-token-${Date.now()}`;

        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
        });
      },

      register: async (name: string, email: string, password: string) => {
        // Mock registration - replace with real API call
        // const response = await authApi.register(name, email, password);

        // Simulate API call
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });

        // Mock user creation
        const users = JSON.parse(localStorage.getItem('mock-users') || '[]');

        // Check if user already exists
        if (users.some((u: { email: string }) => u.email === email)) {
          throw new Error('User already exists');
        }

        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password, // In real app, never store plain password
        };

        users.push(newUser);
        localStorage.setItem('mock-users', JSON.stringify(users));

        const mockUser: User = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        };

        const mockToken = `mock-token-${Date.now()}`;

        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
