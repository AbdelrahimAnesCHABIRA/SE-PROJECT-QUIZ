import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const QuestionScore = ({ question, score }) => {
  const scoreValue = parseFloat(score);
  const isCorrect = scoreValue >= 0.8; // Assuming 80% is passing

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{question}</h3>
          <div className="flex items-center">
            <div className={`text-2xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {(scoreValue * 100).toFixed(0)}%
            </div>
          </div>
        </div>
        <div className="ml-4">
          {isCorrect ? (
            <FaCheckCircle className="text-3xl text-green-500" />
          ) : (
            <FaTimesCircle className="text-3xl text-red-500" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionScore;