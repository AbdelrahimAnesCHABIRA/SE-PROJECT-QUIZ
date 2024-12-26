import React from 'react';
import { Label } from '@radix-ui/react-label';

export const InputField = ({
  label,
  onChange,
  type = 'text',
  value,
  placeholder,
  htmlFor,
}) => {
  return (
    <div className={'space-y-2 '}>
      <Label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </Label>
      <input
        id={htmlFor}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
      />
    </div>
  );
};
