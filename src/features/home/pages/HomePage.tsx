import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@app/shared/components/Layout/Layout';
import { Card } from '@app/common/Card/Card';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    {
      title: t('nav.profile'),
      description: t('profile.description'),
      path: '/profile',
      icon: '👤',
    },
    {
      title: t('nav.settings'),
      description: t('settings.description'),
      path: '/settings',
      icon: '⚙️',
    },
  ];

  const features = [
    { icon: '🔐', text: t('home.featuresList.auth') },
    { icon: '🎨', text: t('home.featuresList.theme') },
    { icon: '🌍', text: t('home.featuresList.i18n') },
    { icon: '📦', text: t('home.featuresList.state') },
    { icon: '🧪', text: t('home.featuresList.testing') },
  ];

  return (
    <Layout>
      <div
        className="flex flex-col gap-8 sm:gap-10 lg:gap-12"
        data-testid="home-page"
      >
        {/* Hero Section */}
        <div
          className="text-center py-6 sm:py-8 lg:py-12"
          data-testid="home-hero"
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 px-4"
            data-testid="home-title"
          >
            {t('home.title')}
          </h1>
          <p
            className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
            data-testid="home-description"
          >
            {t('home.description')}
          </p>
        </div>

        {/* Navigation Cards */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            {t('home.navigation')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="transition-transform hover:-translate-y-1"
              >
                <Card
                  title={`${item.icon} ${item.title}`}
                  description={item.description}
                  interactive
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Features List */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            {t('home.features')}
          </h2>
          <div className="flex flex-col gap-3 sm:gap-4">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
              >
                <span className="text-xl sm:text-2xl flex-shrink-0">
                  {feature.icon}
                </span>
                <span className="text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};
