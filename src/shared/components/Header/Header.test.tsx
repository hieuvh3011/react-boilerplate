import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { useAuthStore } from '@app/features/auth/store/authStore';

// Mock child components
vi.mock('../ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

vi.mock('../LanguageSwitcher/LanguageSwitcher', () => ({
  LanguageSwitcher: () => (
    <div data-testid="language-switcher">LanguageSwitcher</div>
  ),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'common.appName': 'React App',
        'common.logout': 'Logout',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Reset auth state
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('renders app name', () => {
    render(<Header />);
    const logo = screen.getByTestId('header-logo');
    expect(logo).toHaveTextContent('React App');
  });

  it('renders logo link to home', () => {
    render(<Header />);
    const link = screen.getByTestId('header-logo');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders ThemeToggle component', () => {
    render(<Header />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('renders LanguageSwitcher component', () => {
    render(<Header />);
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('does not show user info when not authenticated', () => {
    render(<Header />);
    expect(screen.queryByTestId('header-logout-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('header-user-name')).not.toBeInTheDocument();
  });

  it('shows user name when authenticated', () => {
    useAuthStore.setState({
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      },
      token: 'token-123',
      isAuthenticated: true,
    });

    render(<Header />);
    const userName = screen.getByTestId('header-user-name');
    expect(userName).toHaveTextContent('Test User');
  });

  it('shows logout button when authenticated', () => {
    useAuthStore.setState({
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      },
      token: 'token-123',
      isAuthenticated: true,
    });

    render(<Header />);
    const logoutBtn = screen.getByTestId('header-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
  });

  it('calls logout function when logout button is clicked', async () => {
    const user = userEvent.setup();
    const mockLogout = vi.fn();

    useAuthStore.setState({
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      },
      token: 'token-123',
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(<Header />);

    const logoutButton = screen.getByTestId('header-logout-btn');
    await user.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('applies sticky positioning', () => {
    render(<Header />);
    const header = screen.getByTestId('header');

    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
  });

  it('has correct z-index for overlay', () => {
    render(<Header />);
    const header = screen.getByTestId('header');

    expect(header).toHaveClass('z-50');
  });
});
