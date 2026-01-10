import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@app/features/auth/store/authStore';
import { Button } from '@app/common/Button/Button';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();

  return (
    <header
      className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-50 shadow-sm"
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <Link
          to="/"
          className="text-lg sm:text-xl lg:text-2xl font-bold text-primary flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
          data-testid="header-logo"
        >
          <span className="text-xl sm:text-2xl">⚛️</span>
          <span className="hidden xs:inline sm:inline">
            {t('common.appName')}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <ThemeToggle />
          <LanguageSwitcher />

          {user && (
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <span
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden md:block truncate max-w-[120px] lg:max-w-[200px]"
                data-testid="header-user-name"
              >
                {user.name}
              </span>
              <Button
                variant="outline"
                size="small"
                onClick={logout}
                className="text-xs sm:text-sm"
                testId="header-logout-btn"
              >
                <span className="hidden sm:inline">{t('common.logout')}</span>
                <span className="sm:hidden">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
