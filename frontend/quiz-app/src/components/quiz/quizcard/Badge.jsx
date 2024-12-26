import React from 'react';

export const Badge = ({ children, variant = 'default', className }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'default':
        return 'bg-blue-100 text-blue-800';
      case 'secondary':
        return 'bg-gray-100 text-gray-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getVariantClasses()} ${className || ''}`}
    >
      {children}
    </span>
  );
};