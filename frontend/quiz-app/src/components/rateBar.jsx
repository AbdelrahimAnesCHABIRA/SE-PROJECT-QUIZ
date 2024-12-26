import React, { useState } from "react";

const RatingBar = ({ handleNextQuestion, handleScore }) => {
  const [rating, setRating] = useState(3); // Default rating

  const handleSliderChange = (event) => {
    const selectedRating = parseInt(event.target.value, 10); // Ensure integer value
    setRating(selectedRating);
    handleScore(selectedRating); // Pass the selected rating to handleScore
  };

  return (
    <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow-lg space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700">Rate Us</h2>
      <div className="w-full">
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={handleSliderChange}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
      <div className="flex items-center justify-center space-x-2 text-blue-700">
        <div className="text-lg font-semibold">Score:</div>
        <div className="text-3xl font-bold">{rating}</div>
      </div>
      <button
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
        onClick={handleNextQuestion}
      >
        Next Question
      </button>
    </div>
  );
};

export default RatingBar;
