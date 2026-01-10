import { vi } from 'vitest';

// Mock react-i18next
export const mockT = (key: string) => key;

export const mockUseTranslation = () => ({
  t: mockT,
  i18n: {
    changeLanguage: vi.fn(),
    language: 'en',
  },
});

vi.mock('react-i18next', () => ({
  useTranslation: () => mockUseTranslation(),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));
