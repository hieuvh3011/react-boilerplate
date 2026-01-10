import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import { RegisterPage } from './RegisterPage';
import { useAuthStore } from '../store/authStore';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../components/RegisterForm/RegisterForm', () => ({
  RegisterForm: () => <div data-testid="register-form">RegisterForm</div>,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'auth.register': 'Register',
        'common.welcome': 'Welcome!',
      };
      return translations[key] || key;
    },
  }),
}));

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('renders page title', () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole('heading', { name: /register/i })
    ).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });

  it('renders RegisterForm component', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
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

    render(<RegisterPage />);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('does not redirect when not authenticated', () => {
    render(<RegisterPage />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
