import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = 'ghost', className = '', ...props }, ref) => {
    const variantStyles = {
      primary: 'text-blue-600 hover:bg-blue-100',
      secondary: 'text-gray-700 hover:bg-gray-100',
      ghost: 'text-gray-600 hover:bg-gray-100',
    };

    return (
      <button
        ref={ref}
        className={`p-2 rounded-lg transition-colors ${variantStyles[variant]} ${className}`}
        title={label}
        aria-label={label}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';