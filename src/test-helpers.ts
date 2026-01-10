// Mock localStorage for tests
export class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index: number) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

// Mock user data for tests
export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
};

export const mockToken = 'mock-test-token-123';

// Helper to setup auth state in localStorage
export const setupAuthState = (authenticated = true) => {
  if (authenticated) {
    localStorage.setItem(
      'auth-storage',
      JSON.stringify({
        state: {
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
        },
        version: 0,
      })
    );
  } else {
    localStorage.removeItem('auth-storage');
  }
};

// Helper to setup theme state
export const setupThemeState = (theme: 'light' | 'dark' = 'light') => {
  localStorage.setItem(
    'theme-storage',
    JSON.stringify({
      state: { theme },
      version: 0,
    })
  );
};

// Helper to setup language state
export const setupLanguageState = (language: 'en' | 'vi' = 'en') => {
  localStorage.setItem(
    'language-storage',
    JSON.stringify({
      state: { language },
      version: 0,
    })
  );
};

// Helper to wait for async updates
export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
