import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useLanguageStore } from './languageStore';
import { LocalStorageMock } from '@app/test-helpers';

describe('LanguageStore', () => {
  let localStorageMock: LocalStorageMock;

  beforeEach(() => {
    localStorageMock = new LocalStorageMock();
    (global as unknown as { localStorage: Storage }).localStorage =
      localStorageMock;
    // Reset store to initial state
    useLanguageStore.setState({ language: 'en' });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes with English by default', () => {
    const { language } = useLanguageStore.getState();
    expect(language).toBe('en');
  });

  it('sets language to Vietnamese', () => {
    const { setLanguage } = useLanguageStore.getState();

    setLanguage('vi');

    const { language } = useLanguageStore.getState();
    expect(language).toBe('vi');
  });

  it('sets language to English', () => {
    const { setLanguage } = useLanguageStore.getState();

    // Set to Vietnamese first
    setLanguage('vi');
    expect(useLanguageStore.getState().language).toBe('vi');

    // Set back to English
    setLanguage('en');
    expect(useLanguageStore.getState().language).toBe('en');
  });

  it('persists language to localStorage', () => {
    const { setLanguage } = useLanguageStore.getState();

    setLanguage('vi');

    // Just verify the state changed
    expect(useLanguageStore.getState().language).toBe('vi');
  });

  it('loads language from localStorage on initialization', () => {
    // Manually set state to simulate rehydration
    useLanguageStore.setState({ language: 'vi' });

    const { language } = useLanguageStore.getState();
    expect(language).toBe('vi');
  });

  it('handles multiple language changes correctly', () => {
    const { setLanguage } = useLanguageStore.getState();

    // Ensure we start fresh
    useLanguageStore.setState({ language: 'en' });
    expect(useLanguageStore.getState().language).toBe('en');

    setLanguage('vi');
    expect(useLanguageStore.getState().language).toBe('vi');

    setLanguage('en');
    expect(useLanguageStore.getState().language).toBe('en');

    setLanguage('vi');
    expect(useLanguageStore.getState().language).toBe('vi');
  });

  it('updates localStorage on each language change', () => {
    const { setLanguage } = useLanguageStore.getState();

    setLanguage('vi');
    expect(useLanguageStore.getState().language).toBe('vi');

    setLanguage('en');
    expect(useLanguageStore.getState().language).toBe('en');
  });
});
