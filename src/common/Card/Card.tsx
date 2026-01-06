import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  interactive?: boolean;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  footer,
  interactive = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses =
    'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-5 lg:p-6 transition-all';
  const interactiveClasses = interactive
    ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1'
    : 'hover:shadow-md';

  const cardClasses = `${baseClasses} ${interactiveClasses} ${className}`;

  return (
    <div className={cardClasses} {...props}>
      {(title || description) && (
        <div className="mb-3 sm:mb-4">
          {title && (
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      {children && (
        <div className="text-sm sm:text-base text-gray-900 dark:text-gray-100">
          {children}
        </div>
      )}
      {footer && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};
