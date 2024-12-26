import React from 'react';
import { ChapterCard } from './ModuleCard';



export const ChapterGrid = ({ chapters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-">
      {chapters.map((chapter) => (
        <ChapterCard key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
};