import React from 'react';
import { HelpCircle } from 'lucide-react';

// interface HintButtonProps {
//   onClick: () => void;
//   disabled: boolean;
// }

export const HintButton= ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-full transition-colors duration-200 ${
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
      }`}
      title={disabled ? 'No hints remaining' : 'Show hint'}
    >
      <HelpCircle size={20} />
    </button>
  );
};