import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@app/test-utils';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import { useAuthStore } from '../../store/authStore';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to} data-testid="login-register-link">
        {children}
      </a>
    ),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.loginButton': 'Login',
        'auth.dontHaveAccount': "Don't have an account?",
        'auth.register': 'Register',
        'auth.invalidCredentials': 'Invalid credentials',
        'auth.emailRequired': 'Email is required',
        'auth.emailInvalid': 'Invalid email',
        'auth.passwordMinLength': 'Password must be at least 6 characters',
      };
      return translations[key] || key;
    },
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('renders email input', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('login-email-input')).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('login-password-input')).toBeInTheDocument();
  });

  it('renders login button', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  it('renders link to register page', () => {
    render(<LoginForm />);
    const registerLink = screen.getByTestId('login-register-link');
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByTestId('login-email-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    await user.type(emailInput, 'notanemail');
    await user.click(submitButton);

    // Wait for validation to trigger and check for error
    await waitFor(
      () => {
        const errorElement = screen.queryByText(/invalid email/i);
        expect(errorElement).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('validates password length', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByTestId('login-email-input');
    const passwordInput = screen.getByTestId('login-password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByTestId('login-email-input');
    const passwordInput = screen.getByTestId('login-password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123456');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByTestId('login-email-input');
    const passwordInput = screen.getByTestId('login-password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123456');
    await user.click(submitButton);

    expect(submitButton).toHaveTextContent('...');
  });

  it('shows error message on failed login', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByTestId('login-email-input');
    const passwordInput = screen.getByTestId('login-password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'wrongpass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('login-error')).toHaveTextContent(
        /invalid credentials/i
      );
    });
  });

  it('disables submit button during loading', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByTestId('login-email-input');
    const passwordInput = screen.getByTestId('login-password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123456');
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});
