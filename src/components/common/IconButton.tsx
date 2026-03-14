import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

export function IconButton({ icon, className = '', ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/80 text-slate-700 transition hover:bg-white ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}
