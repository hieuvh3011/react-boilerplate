import {
  LocalStorageMock,
  setupAuthState,
  setupThemeState,
  setupLanguageState,
  waitFor,
  mockUser,
  mockToken,
} from './test-helpers';

describe('LocalStorageMock', () => {
  let storage: LocalStorageMock;

  beforeEach(() => {
    storage = new LocalStorageMock();
  });

  it('should store and retrieve items', () => {
    storage.setItem('key1', 'value1');
    expect(storage.getItem('key1')).toBe('value1');
  });

  it('should return null for non-existent items', () => {
    expect(storage.getItem('nonexistent')).toBeNull();
  });

  it('should remove items', () => {
    storage.setItem('key1', 'value1');
    storage.removeItem('key1');
    expect(storage.getItem('key1')).toBeNull();
  });

  it('should clear all items', () => {
    storage.setItem('key1', 'value1');
    storage.setItem('key2', 'value2');
    storage.clear();
    expect(storage.getItem('key1')).toBeNull();
    expect(storage.getItem('key2')).toBeNull();
    expect(storage.length).toBe(0);
  });

  it('should return correct length', () => {
    expect(storage.length).toBe(0);
    storage.setItem('key1', 'value1');
    expect(storage.length).toBe(1);
    storage.setItem('key2', 'value2');
    expect(storage.length).toBe(2);
  });

  it('should return key by index', () => {
    storage.setItem('key1', 'value1');
    storage.setItem('key2', 'value2');
    // Order is not guaranteed in objects but usually consistent in JS engines for simple keys
    const key0 = storage.key(0);
    const key1 = storage.key(1);
    expect(['key1', 'key2']).toContain(key0);
    expect(['key1', 'key2']).toContain(key1);
    expect(key0).not.toBe(key1);
  });

  it('should return null for invalid key index', () => {
    expect(storage.key(0)).toBeNull();
  });
});

describe('Test Helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('setupAuthState', () => {
    it('should setup authenticated state correctly', () => {
      setupAuthState(true);
      const stored = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      expect(stored).toEqual({
        state: {
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
        },
        version: 0,
      });
    });

    it('should setup unauthenticated state correctly', () => {
      // First set some state
      setupAuthState(true);
      // Then clear it
      setupAuthState(false);
      expect(localStorage.getItem('auth-storage')).toBeNull();
    });
  });

  describe('setupThemeState', () => {
    it('should setup theme state correctly (default light)', () => {
      setupThemeState();
      const stored = JSON.parse(localStorage.getItem('theme-storage') || '{}');
      expect(stored).toEqual({
        state: { theme: 'light' },
        version: 0,
      });
    });

    it('should setup dark theme', () => {
      setupThemeState('dark');
      const stored = JSON.parse(localStorage.getItem('theme-storage') || '{}');
      expect(stored).toEqual({
        state: { theme: 'dark' },
        version: 0,
      });
    });
  });

  describe('setupLanguageState', () => {
    it('should setup language state correctly (default en)', () => {
      setupLanguageState();
      const stored = JSON.parse(
        localStorage.getItem('language-storage') || '{}'
      );
      expect(stored).toEqual({
        state: { language: 'en' },
        version: 0,
      });
    });

    it('should setup vietnamese language', () => {
      setupLanguageState('vi');
      const stored = JSON.parse(
        localStorage.getItem('language-storage') || '{}'
      );
      expect(stored).toEqual({
        state: { language: 'vi' },
        version: 0,
      });
    });
  });

  describe('waitFor', () => {
    it('should resolve after delay', async () => {
      const start = Date.now();
      await waitFor(100);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(100 - 20); // Allow some tolerance
    });
  });
});
