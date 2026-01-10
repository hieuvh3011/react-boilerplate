import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@app/test-utils';
import { SettingsPage } from './SettingsPage';
import { useThemeStore } from '@app/shared/stores/themeStore';
import { useLanguageStore } from '@app/shared/stores/languageStore';

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
        'settings.title': 'Settings',
        'settings.appearance': 'Appearance',
        'settings.theme': 'Theme',
        'settings.language': 'Language',
        'settings.darkMode': 'Dark Mode',
        'settings.lightMode': 'Light Mode',
      };
      return translations[key] || key;
    },
  }),
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' });
    useLanguageStore.setState({ language: 'en' });
  });

  it('renders within Layout', () => {
    render(<SettingsPage />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('renders page title', () => {
    render(<SettingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Settings' })
    ).toBeInTheDocument();
  });

  it('renders appearance section', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Appearance')).toBeInTheDocument();
  });

  it('displays current theme (light mode)', () => {
    useThemeStore.setState({ theme: 'light' });
    render(<SettingsPage />);

    expect(screen.getByText('Theme:')).toBeInTheDocument();
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
  });

  it('displays current theme (dark mode)', () => {
    useThemeStore.setState({ theme: 'dark' });
    render(<SettingsPage />);

    expect(screen.getByText('Theme:')).toBeInTheDocument();
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('displays current language (English)', () => {
    useLanguageStore.setState({ language: 'en' });
    render(<SettingsPage />);

    expect(screen.getByText('Language:')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('displays current language (Vietnamese)', () => {
    useLanguageStore.setState({ language: 'vi' });
    render(<SettingsPage />);

    expect(screen.getByText('Language:')).toBeInTheDocument();
    expect(screen.getByText('Tiếng Việt')).toBeInTheDocument();
  });

  it('renders tip card', () => {
    render(<SettingsPage />);
    expect(screen.getByText('💡 Tip')).toBeInTheDocument();
    expect(
      screen.getByText(/Use the buttons in the header/)
    ).toBeInTheDocument();
  });

  it('renders persistence message', () => {
    render(<SettingsPage />);
    expect(screen.getByText(/automatically saved/)).toBeInTheDocument();
  });
});
