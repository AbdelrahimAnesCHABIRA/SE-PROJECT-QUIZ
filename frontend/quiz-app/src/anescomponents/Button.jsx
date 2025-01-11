import React from 'react';


export default function Button({ text, onclick, disabled, className, icon: Icon }) {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 
        px-6 py-3 rounded-lg font-medium
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${disabled 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500'
        }
        ${className}
      `}
    >
      {Icon && <Icon size={20} className="shrink-0" />}
      {text}
    </button>
  );
}