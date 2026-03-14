import React from 'react';

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  onRemove?: () => void;
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md';
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  variant = 'filled',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1 rounded-full font-medium transition-all';
  
  const variantStyles = {
    filled: 'bg-blue-100 text-blue-700',
    outlined: 'border border-gray-300 text-gray-700 bg-white',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 font-bold hover:opacity-70"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </div>
  );
};