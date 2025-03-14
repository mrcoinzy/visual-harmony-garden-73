
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'feature' | 'glass';
}

const Card = ({ 
  className,
  title, 
  description, 
  icon, 
  children,
  onClick,
  variant = 'default'
}: CardProps) => {
  const variants = {
    default: 'bg-quickfix-dark-gray',
    feature: 'card-featured',
    glass: 'glass-card'
  };
  
  return (
    <div 
      className={cn(
        'rounded-xl p-5 hover-card',
        variants[variant],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <div className="icon-container">
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      )}
      
      {description && (
        <p className="text-sm text-gray-300 mb-4">{description}</p>
      )}
      
      {children}
    </div>
  );
};

export default Card;
