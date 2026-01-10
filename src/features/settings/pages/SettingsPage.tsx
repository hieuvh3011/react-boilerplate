import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@app/shared/components/Layout/Layout';
import { Card } from '@app/common/Card/Card';
import { useThemeStore } from '@app/shared/stores/themeStore';
import { useLanguageStore } from '@app/shared/stores/languageStore';

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();

  return (
    <Layout>
      <div
        className="max-w-full sm:max-w-2xl lg:max-w-3xl"
        data-testid="settings-page"
      >
        <h1
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8"
          data-testid="settings-title"
        >
          {t('settings.title')}
        </h1>

        <div className="flex flex-col gap-4 sm:gap-6">
          <Card title={t('settings.appearance')}>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div>
                <strong className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {t('settings.theme')}:
                </strong>
                <p className="mt-1 text-base sm:text-lg text-gray-900 dark:text-gray-100">
                  {theme === 'dark'
                    ? t('settings.darkMode')
                    : t('settings.lightMode')}
                </p>
              </div>
              <div>
                <strong className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {t('settings.language')}:
                </strong>
                <p className="mt-1 text-base sm:text-lg text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'English' : 'Tiếng Việt'}
                </p>
              </div>
            </div>
          </Card>

          <Card
            title="💡 Tip"
            description="Use the buttons in the header to change theme and language"
          >
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Your preferences are automatically saved and will persist across
              sessions.
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
