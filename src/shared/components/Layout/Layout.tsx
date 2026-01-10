import React from 'react';
import { Header } from '../Header/Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" data-testid="layout">
      <Header />
      <main
        className="flex-1 w-full mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 max-w-7xl"
        data-testid="layout-content"
      >
        {children}
      </main>
    </div>
  );
};
