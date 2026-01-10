import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@app/test-utils';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from './RegisterForm';
import { useAuthStore } from '../../store/authStore';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to} data-testid="register-login-link">
        {children}
      </a>
    ),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'auth.name': 'Name',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.confirmPassword': 'Confirm Password',
        'auth.registerButton': 'Register',
        'auth.alreadyHaveAccount': 'Already have an account?',
        'auth.login': 'Login',
        'auth.nameRequired': 'Name is required',
        'auth.emailRequired': 'Email is required',
        'auth.emailInvalid': 'Invalid email',
        'auth.passwordMinLength': 'Password must be at least 6 characters',
        'auth.passwordsNotMatch': 'Passwords do not match',
      };
      return translations[key] || key;
    },
  }),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.clear();
  });

  it('renders all input fields', () => {
    render(<RegisterForm />);

    expect(screen.getByTestId('register-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('register-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('register-password-input')).toBeInTheDocument();
    expect(
      screen.getByTestId('register-confirm-password-input')
    ).toBeInTheDocument();
  });

  it('renders register button', () => {
    render(<RegisterForm />);
    expect(screen.getByTestId('register-submit-btn')).toBeInTheDocument();
  });

  it('renders link to login page', () => {
    render(<RegisterForm />);
    const loginLink = screen.getByTestId('register-login-link');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const submitButton = screen.getByTestId('register-submit-btn');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('register-name-input-error')).toHaveTextContent(
        /name is required/i
      );
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const nameInput = screen.getByTestId('register-name-input');
    const emailInput = screen.getByTestId('register-email-input');
    const submitButton = screen.getByTestId('register-submit-btn');

    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'notanemail');
    await user.click(submitButton);

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
    render(<RegisterForm />);

    const nameInput = screen.getByTestId('register-name-input');
    const emailInput = screen.getByTestId('register-email-input');
    const passwordInput = screen.getByTestId('register-password-input');
    const submitButton = screen.getByTestId('register-submit-btn');

    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByTestId('register-password-input-error')
      ).toHaveTextContent(/at least 6 characters/i);
    });
  });

  it('validates password match', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const nameInput = screen.getByTestId('register-name-input');
    const emailInput = screen.getByTestId('register-email-input');
    const passwordInput = screen.getByTestId('register-password-input');
    const confirmPasswordInput = screen.getByTestId(
      'register-confirm-password-input'
    );
    const submitButton = screen.getByTestId('register-submit-btn');

    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123456');
    await user.type(confirmPasswordInput, '654321');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByTestId('register-confirm-password-input-error')
      ).toHaveTextContent(/passwords do not match/i);
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const nameInput = screen.getByTestId('register-name-input');
    const emailInput = screen.getByTestId('register-email-input');
    const passwordInput = screen.getByTestId('register-password-input');
    const confirmPasswordInput = screen.getByTestId(
      'register-confirm-password-input'
    );
    const submitButton = screen.getByTestId('register-submit-btn');

    await user.type(nameInput, 'New User');
    await user.type(emailInput, 'newuser@example.com');
    await user.type(passwordInput, '123456');
    await user.type(confirmPasswordInput, '123456');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const nameInput = screen.getByTestId('register-name-input');
    const emailInput = screen.getByTestId('register-email-input');
    const passwordInput = screen.getByTestId('register-password-input');
    const confirmPasswordInput = screen.getByTestId(
      'register-confirm-password-input'
    );
    const submitButton = screen.getByTestId('register-submit-btn');

    await user.type(nameInput, 'New User');
    await user.type(emailInput, 'newuser@example.com');
    await user.type(passwordInput, '123456');
    await user.type(confirmPasswordInput, '123456');
    await user.click(submitButton);

    expect(submitButton).toHaveTextContent('...');
  });

  it('shows error when email already exists', async () => {
    const user = userEvent.setup();

    // Pre-register a user
    await useAuthStore
      .getState()
      .register('Existing User', 'existing@example.com', '123456');
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false });

    render(<RegisterForm />);

    const nameInput = screen.getByTestId('register-name-input');
    const emailInput = screen.getByTestId('register-email-input');
    const passwordInput = screen.getByTestId('register-password-input');
    const confirmPasswordInput = screen.getByTestId(
      'register-confirm-password-input'
    );
    const submitButton = screen.getByTestId('register-submit-btn');

    await user.type(nameInput, 'Another User');
    await user.type(emailInput, 'existing@example.com');
    await user.type(passwordInput, '123456');
    await user.type(confirmPasswordInput, '123456');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('register-error')).toHaveTextContent(
        /user already exists/i
      );
    });
  });
});
