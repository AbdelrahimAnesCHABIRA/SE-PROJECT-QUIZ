import React from 'react';
import { motion } from 'framer-motion';

const SpeedTracker = ({ value }) => {
  const percentage = parseFloat(value) ;
  const getColor = (percent) => {
    if (percent >= 80) return '#22c55e';
    if (percent >= 60) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Overall Performance</h2>
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage/100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: getColor(percentage) }}
        />
      </div>
      <div className="mt-2 text-center">
        <span className="text-2xl font-bold" style={{ color: getColor(percentage) }}>
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export default SpeedTracker;