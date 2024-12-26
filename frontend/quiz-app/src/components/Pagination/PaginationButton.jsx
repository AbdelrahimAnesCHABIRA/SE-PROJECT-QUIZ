import React from 'react';

export const PaginationButton = ({ children, active, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-3 py-2 rounded-lg text-sm font-medium transition-colors
      ${active 
        ? 'bg-primary text-white' 
        : 'text-gray-700 hover:bg-gray-100'
      }
      ${disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:bg-primary hover:text-white'
      }
    `}
  >
    {children}
  </button>
);