import type { ButtonHTMLAttributes } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active = false, className = '', children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={`rounded-full px-3 py-2 text-sm font-medium transition ${
        active
          ? 'bg-[var(--accent)] text-white'
          : 'border border-[var(--line)] bg-white/70 text-slate-700 hover:bg-white'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
