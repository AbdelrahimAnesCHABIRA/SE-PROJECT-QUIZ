import React, { useState, useEffect } from 'react';

const MCQQuestion = ({ question }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    setShowOptions(false); // Reset the options view when the question changes
  }, [question._id]); // Use _id to track question change

  const handleShowOptionsClick = () => {
    setShowOptions(true);
  };

  // Combine correctAnswer with falseOptions to form options
  const options = [question.correctAnswer, ...question.falseOptions];

  return (
    <div className="h-[89%] w-[98%] mx-auto space-y-6 overflow-y-auto custom-scrollbar">
      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Content Section */}
          <div className="flex-1 order-2 md:order-1">
            {/* Question Header */}
            <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold text-gray-900 leading-relaxed">
                {question.questionText}
              </h2>
            </div>

            {/* Explanation */}
            <div className="p-4 bg-blue-50 rounded-lg text-blue-700 text-sm mb-6">
              {question.explanation}
            </div>

            {/* Button to show options */}
            {!showOptions && (
              <button
                onClick={handleShowOptionsClick}
                className="w-full p-3 rounded-lg text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 mb-6"
              >
                Show Options
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Options Grid */}
      {showOptions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] mx-auto">
          {options.map((option, index) => {
            const isCorrect = option === question.correctAnswer;

            return (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 text-left min-h-[60px] flex items-center ${
                  isCorrect
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-gray-50 text-gray-500"
                } transition-transform transform hover:scale-105 cursor-pointer`}
              >
                <div className="text-lg font-medium">{option}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MCQQuestion;
