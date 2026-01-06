import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@app/shared/i18n/config';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
