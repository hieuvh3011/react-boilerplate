import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  testId?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  testId = 'button',
  className = '',
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

  const variantClasses = {
    primary:
      'bg-primary text-white border-primary hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
    secondary:
      'bg-secondary text-white border-secondary hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
    outline:
      'bg-transparent text-primary border-primary hover:bg-primary hover:text-white',
    ghost:
      'bg-transparent text-gray-900 dark:text-gray-100 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
    danger:
      'bg-danger text-white border-danger hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
  };

  const sizeClasses = {
    small: 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm',
    medium: 'px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base',
    large: 'px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button
      type="button"
      className={buttonClasses}
      data-testid={testId}
      {...props}
    >
      {children}
    </button>
  );
};
