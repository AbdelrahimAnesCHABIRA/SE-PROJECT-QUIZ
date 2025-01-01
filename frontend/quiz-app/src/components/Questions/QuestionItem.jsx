import React from 'react';
import QuestionProgressBar from './QuestionProgressBar';

const QuestionItem = ({ question, score, time }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-800">{question}</h3>
        <span className="text-sm font-bold ml-2">{score}%</span>
      </div>
      <QuestionProgressBar score={score} time={time} />
    </div>
  );
};

export default QuestionItem;