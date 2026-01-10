import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@app/test-utils';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuthStore } from '../store/authStore';
import { setupAuthState } from '@app/test-helpers';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => {
      mockNavigate(to);
      return <div>Redirecting to {to}</div>;
    },
  };
});

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('renders children when user is authenticated', () => {
    setupAuthState(true);
    useAuthStore.persist.rehydrate();

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', async () => {
    setupAuthState(false);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('does not render children when not authenticated', () => {
    setupAuthState(false);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('handles authentication state changes', async () => {
    setupAuthState(false);

    const { rerender } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();

    // Authenticate user
    setupAuthState(true);
    useAuthStore.persist.rehydrate();

    rerender(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });
});
