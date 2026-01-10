import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import { ProfilePage } from './ProfilePage';
import { useAuthStore } from '@app/features/auth/store/authStore';

// Mock Layout
vi.mock('@app/shared/components/Layout/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'profile.title': 'Profile',
        'profile.userInfo': 'User Information',
        'auth.name': 'Name',
        'auth.email': 'Email',
      };
      return translations[key] || key;
    },
  }),
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      },
      token: 'token-123',
      isAuthenticated: true,
    });
  });

  it('renders within Layout', () => {
    render(<ProfilePage />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('renders page title', () => {
    render(<ProfilePage />);
    expect(
      screen.getByRole('heading', { name: 'Profile' })
    ).toBeInTheDocument();
  });

  it('renders user information card title', () => {
    render(<ProfilePage />);
    expect(screen.getByText('User Information')).toBeInTheDocument();
  });

  it('displays user name', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('displays user email', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('displays user ID', () => {
    render(<ProfilePage />);
    expect(screen.getByText('User ID:')).toBeInTheDocument();
    expect(screen.getByText('user-123')).toBeInTheDocument();
  });

  it('handles null user gracefully', () => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });

    render(<ProfilePage />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
