import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export function Card({ children, hoverable = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`card-base ${hoverable ? 'transition hover:-translate-y-0.5 hover:shadow-md' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
