import React from 'react';
import StatCard from './StatCard';

const StatsGrid = ({ averageScore, totalTime, totalQuestions }) => {
  const scoreOutOf5 = (averageScore / 20).toFixed(1);
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <StatCard
        type="score"
        label="Average Score"
        value={
          <div className="flex flex-col items-center">
            <span>{Math.round(averageScore)}%</span>
            <span className="text-sm text-gray-500">({scoreOutOf5}/5)</span>
          </div>
        }
      />
      <StatCard
        type="time"
        label="Total Time"
        value={totalTime}
      />
      <StatCard
        type="questions"
        label="Questions"
        value={totalQuestions}
      />
    </div>
  );
};

export default StatsGrid;