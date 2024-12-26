import React from 'react';

export default function Button({ children, type = 'button', onClick, fullWidth = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        fullWidth ? 'w-full' : ''
      } flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200`}
    >
      {children}
    </button>
  );
}