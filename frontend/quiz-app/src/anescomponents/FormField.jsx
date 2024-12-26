import React from 'react';
import { Label } from '@radix-ui/react-label';

export const FormField = ({
  label,
  required,
  children,
  className = '',
  error,
  htmlFor,
}) => {
  return (
    <div className={`space-y-2  ${className}`}>
      <Label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};
