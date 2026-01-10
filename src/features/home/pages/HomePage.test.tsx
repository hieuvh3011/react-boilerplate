import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import { HomePage } from './HomePage';

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
        'home.title': 'Welcome to React Boilerplate',
        'home.description': 'A modern React TypeScript boilerplate',
        'home.navigation': 'Quick Navigation',
        'home.features': 'Features',
        'nav.profile': 'Profile',
        'nav.settings': 'Settings',
        'profile.description': 'View your profile',
        'settings.description': 'Manage settings',
        'home.featuresList.auth': 'Authentication',
        'home.featuresList.theme': 'Dark/Light Theme',
        'home.featuresList.i18n': 'Internationalization',
        'home.featuresList.state': 'State Management',
        'home.featuresList.testing': 'Testing Setup',
      };
      return translations[key] || key;
    },
  }),
}));

describe('HomePage', () => {
  it('renders within Layout', () => {
    render(<HomePage />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('renders page title', () => {
    render(<HomePage />);
    expect(
      screen.getByText('Welcome to React Boilerplate')
    ).toBeInTheDocument();
  });

  it('renders page description', () => {
    render(<HomePage />);
    expect(
      screen.getByText('A modern React TypeScript boilerplate')
    ).toBeInTheDocument();
  });

  it('renders navigation section title', () => {
    render(<HomePage />);
    expect(screen.getByText('Quick Navigation')).toBeInTheDocument();
  });

  it('renders profile navigation card', () => {
    render(<HomePage />);
    expect(screen.getByText(/Profile/)).toBeInTheDocument();
    expect(screen.getByText('View your profile')).toBeInTheDocument();
  });

  it('renders settings navigation card', () => {
    render(<HomePage />);
    expect(screen.getByText(/Settings/)).toBeInTheDocument();
    expect(screen.getByText('Manage settings')).toBeInTheDocument();
  });

  it('renders features section title', () => {
    render(<HomePage />);
    expect(screen.getByText('Features')).toBeInTheDocument();
  });

  it('renders all feature items', () => {
    render(<HomePage />);

    expect(screen.getByText('Authentication')).toBeInTheDocument();
    expect(screen.getByText('Dark/Light Theme')).toBeInTheDocument();
    expect(screen.getByText('Internationalization')).toBeInTheDocument();
    expect(screen.getByText('State Management')).toBeInTheDocument();
    expect(screen.getByText('Testing Setup')).toBeInTheDocument();
  });

  it('renders navigation links with correct paths', () => {
    render(<HomePage />);

    const profileLink = screen.getByRole('link', { name: /profile/i });
    const settingsLink = screen.getByRole('link', { name: /settings/i });

    expect(profileLink).toHaveAttribute('href', '/profile');
    expect(settingsLink).toHaveAttribute('href', '/settings');
  });

  it('renders feature icons', () => {
    render(<HomePage />);

    expect(screen.getByText('🔐')).toBeInTheDocument();
    expect(screen.getByText('🎨')).toBeInTheDocument();
    expect(screen.getByText('🌍')).toBeInTheDocument();
    expect(screen.getByText('📦')).toBeInTheDocument();
    expect(screen.getByText('🧪')).toBeInTheDocument();
  });
});
