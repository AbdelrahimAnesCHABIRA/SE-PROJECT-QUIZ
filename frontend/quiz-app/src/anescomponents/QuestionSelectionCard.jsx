import React from 'react';
import { Brain, Clock,Trophy } from 'lucide-react';

export const QuestionSelectionCard = ({
  questionText,
  stats,
  isSelected,
  onToggle,
}) => {
  

  return (
    <button
      onClick={onToggle}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-2">{questionText}</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Brain size={16} />
              <span>{stats.numAnswered} attempts</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Trophy size={16} />
              <span>{stats.highestScore} max score</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          stats.avgScore >= 4
            ? "bg-green-100 text-green-700"
            : stats.avgScore >= 2
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}>
          {stats.avgScore}
        </div>
      </div>
    </button>
  );
};