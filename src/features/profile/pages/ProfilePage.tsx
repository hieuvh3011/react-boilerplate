import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@app/features/auth/store/authStore';
import { Layout } from '@app/shared/components/Layout/Layout';
import { Card } from '@app/common/Card/Card';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <Layout>
      <div
        className="max-w-full sm:max-w-2xl lg:max-w-3xl"
        data-testid="profile-page"
      >
        <h1
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8"
          data-testid="profile-title"
        >
          {t('profile.title')}
        </h1>

        <Card title={t('profile.userInfo')}>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <strong className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {t('auth.name')}:
              </strong>
              <p className="mt-1 text-base sm:text-lg text-gray-900 dark:text-gray-100 break-words">
                {user?.name}
              </p>
            </div>
            <div>
              <strong className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {t('auth.email')}:
              </strong>
              <p className="mt-1 text-base sm:text-lg text-gray-900 dark:text-gray-100 break-all">
                {user?.email}
              </p>
            </div>
            <div>
              <strong className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                User ID:
              </strong>
              <p className="mt-1 text-sm sm:text-base text-gray-900 dark:text-gray-100 font-mono break-all">
                {user?.id}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
