import React from 'react';
import StatCard from './StatCard';

const StatsGrid = ({ averageScore, totalTime, totalQuestions, statsLabels }) => {
  const scoreOutOf5 = (averageScore / 20).toFixed(1);
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <StatCard
        type="score"
        label= {statsLabels.averageScore}
        value={
          <div className="flex flex-col items-center">
            <span>{Math.round(averageScore)}%</span>
            <span className="text-sm text-gray-500">({scoreOutOf5}/5)</span>
          </div>
        }
      />
      <StatCard
        type="time"
        label={statsLabels.totalTime}
        value={totalTime}
      />
      <StatCard
        type="questions"
        label={statsLabels.totalQuestions}
        value={totalQuestions}
      />
    </div>
  );
};

export default StatsGrid;