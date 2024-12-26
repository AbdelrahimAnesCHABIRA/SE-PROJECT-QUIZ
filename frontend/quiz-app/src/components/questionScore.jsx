import React from 'react';

const QuestionScore = ({ question, score }) => {
  // Determine the color based on the score
  let scoreColor;
  if (score >= 4) {
    scoreColor = 'bg-green-500';
  } else if (score >= 2) {
    scoreColor = 'bg-yellow-500';
  } else {
    scoreColor = 'bg-red-500';
  }

  return (
    <div className="p-2 rounded-lg flex items-center space-x-4">
      <div className={`w-full p-3 rounded-lg ${scoreColor} text-white`}>
        <p className="text-xl font-semibold">{question}</p>
        <p className="text-lg mt-1">Score: {score}</p>
      </div>
    </div>
  );
};

export default QuestionScore;
