import React from 'react';

const QuestionProgressBar = ({ score, time }) => {
  const getBarColor = (score) => {
    if (score >= 90) return 'bg-green-500'; // 4.5-5.0
    if (score >= 80) return 'bg-green-400'; // 4.0-4.4
    if (score >= 70) return 'bg-yellow-400'; // 3.5-3.9
    if (score >= 60) return 'bg-yellow-500'; // 3.0-3.4
    return 'bg-red-500'; // Below 3.0
  };

  return (
    <div className="flex items-center w-full">
      <div className="flex-1 mr-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-full rounded-full ${getBarColor(score)} transition-all duration-300`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-sm whitespace-nowrap">
          {(score / 20).toFixed(1)}/5
        </span>
        <span className="text-gray-400 text-sm">·</span>
        <span className="text-gray-500 text-sm whitespace-nowrap">
          {time}s
        </span>
      </div>
    </div>
  );
};

export default QuestionProgressBar;