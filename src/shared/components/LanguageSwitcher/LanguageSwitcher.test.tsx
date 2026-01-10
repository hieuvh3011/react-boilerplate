import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@app/test-utils';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguageStore } from '@app/shared/stores/languageStore';

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}));

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    // Reset language to English
    useLanguageStore.setState({ language: 'en' });
  });

  it('renders language selector button', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByTestId('language-switcher-button');
    expect(button).toBeInTheDocument();
  });

  it('shows current language code', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByTestId('language-switcher-button');
    expect(button).toHaveTextContent('EN');
  });

  it('shows current language flag', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByTestId('language-switcher-button');
    expect(button).toHaveTextContent('🇺🇸');
  });

  it('shows Vietnamese flag when language is Vietnamese', () => {
    useLanguageStore.setState({ language: 'vi' });
    render(<LanguageSwitcher />);

    const button = screen.getByTestId('language-switcher-button');
    expect(button).toHaveTextContent('🇻🇳');
    expect(button).toHaveTextContent('VI');
  });

  it('opens dropdown on button click', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const button = screen.getByTestId('language-switcher-button');
    await user.click(button);

    const dropdown = screen.getByTestId('language-switcher-dropdown');
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByTestId('language-option-en')).toBeInTheDocument();
    expect(screen.getByTestId('language-option-vi')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <LanguageSwitcher />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const button = screen.getByTestId('language-switcher-button');
    await user.click(button);

    expect(
      screen.getByTestId('language-switcher-dropdown')
    ).toBeInTheDocument();

    const outside = screen.getByTestId('outside');
    await user.click(outside);

    await waitFor(() => {
      expect(
        screen.queryByTestId('language-switcher-dropdown')
      ).not.toBeInTheDocument();
    });
  });

  it('changes language to Vietnamese', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const button = screen.getByTestId('language-switcher-button');
    await user.click(button);

    const viOption = screen.getByTestId('language-option-vi');
    await user.click(viOption);

    expect(useLanguageStore.getState().language).toBe('vi');
  });

  it('changes language to English', async () => {
    const user = userEvent.setup();
    useLanguageStore.setState({ language: 'vi' });

    render(<LanguageSwitcher />);

    const button = screen.getByTestId('language-switcher-button');
    await user.click(button);

    const enOption = screen.getByTestId('language-option-en');
    await user.click(enOption);

    expect(useLanguageStore.getState().language).toBe('en');
  });

  it('closes dropdown after selecting language', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const button = screen.getByTestId('language-switcher-button');
    await user.click(button);

    const viOption = screen.getByTestId('language-option-vi');
    await user.click(viOption);

    await waitFor(() => {
      expect(
        screen.queryByTestId('language-switcher-dropdown')
      ).not.toBeInTheDocument();
    });
  });

  it('highlights current language in dropdown', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const button = screen.getByTestId('language-switcher-button');
    await user.click(button);

    const enButton = screen.getByTestId('language-option-en');

    expect(enButton).toHaveClass('font-medium');
  });

  it('rotates chevron icon when dropdown is open', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const button = screen.getByTestId('language-switcher-button');
    const svg = button.querySelector('svg');

    expect(svg).not.toHaveClass('rotate-180');

    await user.click(button);

    expect(svg).toHaveClass('rotate-180');
  });
});
