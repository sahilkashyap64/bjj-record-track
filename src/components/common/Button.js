import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const variantStyles = {
    primary: 'bg-[var(--accent)] text-white hover:opacity-90',
    secondary: 'bg-[var(--highlight)] text-slate-900 hover:opacity-90',
    outline: 'border border-[var(--line)] bg-white/70 text-slate-800 hover:bg-white',
    ghost: 'bg-transparent text-slate-700 hover:bg-white/60',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
};
const sizeStyles = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-3.5 text-sm',
};
export const Button = React.forwardRef(({ variant = 'primary', size = 'md', className = '', isLoading, children, ...props }, ref) => (_jsx("button", { ref: ref, className: `btn-base ${variantStyles[variant]} ${sizeStyles[size]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`, disabled: isLoading || props.disabled, ...props, children: isLoading ? 'Saving...' : children })));
Button.displayName = 'Button';
