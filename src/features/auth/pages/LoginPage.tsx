import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { LoginForm } from '../components/LoginForm/LoginForm';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-secondary"
      data-testid="login-page"
    >
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
              data-testid="login-page-title"
            >
              {t('auth.login')}
            </h1>
            <p
              className="text-sm text-gray-600 dark:text-gray-400"
              data-testid="login-page-subtitle"
            >
              {t('common.welcome')}
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
