import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import { LoginPage } from './LoginPage';
import { useAuthStore } from '../store/authStore';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../components/LoginForm/LoginForm', () => ({
  LoginForm: () => <div data-testid="login-form">LoginForm</div>,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'auth.login': 'Login',
        'common.welcome': 'Welcome back!',
      };
      return translations[key] || key;
    },
  }),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('renders page title', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<LoginPage />);
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
  });

  it('renders LoginForm component', () => {
    render(<LoginPage />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('redirects to home when already authenticated', () => {
    useAuthStore.setState({
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      },
      token: 'token-123',
      isAuthenticated: true,
    });

    render(<LoginPage />);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('does not redirect when not authenticated', () => {
    render(<LoginPage />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
