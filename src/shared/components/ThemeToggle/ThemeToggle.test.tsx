import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@app/test-utils';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';
import { useThemeStore } from '@app/shared/stores/themeStore';

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    // Reset theme to light
    useThemeStore.setState({ theme: 'light' });
    // Clear document classes
    document.documentElement.classList.remove('dark');
  });

  it('renders toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');
    expect(button).toBeInTheDocument();
  });

  it('shows moon icon when theme is light', () => {
    useThemeStore.setState({ theme: 'light' });
    render(<ThemeToggle />);

    const button = screen.getByTestId('theme-toggle');
    expect(button).toHaveAttribute('title', 'Switch to dark mode');
  });

  it('shows sun icon when theme is dark', () => {
    useThemeStore.setState({ theme: 'dark' });
    render(<ThemeToggle />);

    const button = screen.getByTestId('theme-toggle');
    expect(button).toHaveAttribute('title', 'Switch to light mode');
  });

  it('toggles theme on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByTestId('theme-toggle');
    expect(useThemeStore.getState().theme).toBe('light');

    await user.click(button);
    expect(useThemeStore.getState().theme).toBe('dark');

    await user.click(button);
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('adds dark class to document when theme is dark', () => {
    useThemeStore.setState({ theme: 'dark' });
    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class from document when theme is light', () => {
    // Start with dark theme
    document.documentElement.classList.add('dark');
    useThemeStore.setState({ theme: 'light' });

    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('updates document class when theme changes', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    const button = screen.getByTestId('theme-toggle');
    await user.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('has correct aria-label', () => {
    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
  });
});
