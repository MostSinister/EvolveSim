// src/components/ui/button.js
import React from 'react';

export const Button = ({ children, variant = 'default', size = 'md', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-lg focus:outline-none focus:ring';
  const variants = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    ghost: 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white',
  };
  const sizes = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
    icon: 'p-2', // For icon-only buttons
  };
  const className = `${baseStyle} ${variants[variant]} ${sizes[size]}`;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
