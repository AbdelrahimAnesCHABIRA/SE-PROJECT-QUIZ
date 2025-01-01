import React from 'react';
import { FaTrophy, FaClock, FaQuestionCircle } from 'react-icons/fa';

const icons = {
  score: FaTrophy,
  time: FaClock,
  questions: FaQuestionCircle,
};

const colors = {
  score: 'text-yellow-400',
  time: 'text-blue-500',
  questions: 'text-green-500',
};

const StatCard = ({ type, label, value }) => {
  const Icon = icons[type];
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
      <Icon className={`text-2xl mb-2 ${colors[type]}`} />
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="text-xl font-bold mt-1">{value}</span>
    </div>
  );
};

export default StatCard;