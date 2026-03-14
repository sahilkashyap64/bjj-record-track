import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-[var(--accent)] text-white hover:opacity-90',
  secondary: 'bg-[var(--highlight)] text-slate-900 hover:opacity-90',
  outline: 'border border-[var(--line)] bg-white/70 text-slate-800 hover:bg-white',
  ghost: 'bg-transparent text-slate-700 hover:bg-white/60',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-5 py-3.5 text-sm',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', isLoading, children, ...props }, ref) => (
    <button
      ref={ref}
      className={`btn-base ${variantStyles[variant]} ${sizeStyles[size]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Saving...' : children}
    </button>
  ),
);

Button.displayName = 'Button';
