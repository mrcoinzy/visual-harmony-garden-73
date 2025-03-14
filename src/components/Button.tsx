
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  className, 
  ...props 
}: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-quickfix-yellow text-quickfix-dark font-medium btn-glow',
    secondary: 'bg-quickfix-green text-white font-medium btn-glow',
    outline: 'bg-transparent border border-quickfix-yellow text-quickfix-yellow font-medium',
    ghost: 'bg-transparent hover:bg-quickfix-yellow/10 text-quickfix-yellow font-medium',
  };
  
  const sizeClasses = {
    sm: 'text-sm py-2 px-3',
    md: 'text-base py-3 px-4',
    lg: 'text-lg py-4 px-6',
  };
  
  return (
    <button 
      className={cn(
        'rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium',
        variantClasses[variant],
        sizeClasses[size],
        'hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0',
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
