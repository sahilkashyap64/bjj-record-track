import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hoverable = false, className = '', ...props }) => {
  return (
    <div
      className={`card-base ${hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};