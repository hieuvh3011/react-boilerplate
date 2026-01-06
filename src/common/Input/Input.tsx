import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      className = '',
      required,
      ...props
    },
    ref
  ) => {
    const inputClasses = `w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800 ${
      error
        ? 'border-danger focus:ring-danger'
        : 'border-gray-300 dark:border-gray-700 focus:border-primary'
    } ${className}`;

    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
            htmlFor={props.id}
          >
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <span className="text-xs text-danger mt-1">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
