import React from 'react';
import { cn } from '@/lib/utils';

export const QuestionImageCard = ({
  imageUrl,
  onClick,
  className,
}) => {
  return (
    <div className={cn("p-3", className)}>
      <button
        onClick={onClick}
        className="w-full aspect-video max-h-[200px] relative group overflow-hidden rounded-lg shadow-sm border border-gray-100"
      >
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors z-10" />
        <img
          src={imageUrl}
          alt="Question illustration"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};