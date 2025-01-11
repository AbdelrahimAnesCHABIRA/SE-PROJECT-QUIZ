import React from 'react';
import { User, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// interface BottomBarProps {
//   userName: string;
//   avatarUrl?: string;
//   onNextQuestion?: () => void;
//   isAnswered: boolean;
//   isLastQuestion?: boolean;
// }

export const BottomBar = ({
  userName,
  avatarUrl,
  onNextQuestion,
  isAnswered,
  isLastQuestion = false,
}) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t"
    >
      <div className="w-[95%] mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
          )}
          <span className="font-medium text-gray-900">{userName}</span>
        </div>
        
        {onNextQuestion && (
          <motion.button
            onClick={onNextQuestion}
            disabled={!isAnswered}
            whileHover={isAnswered ? { scale: 1.02 } : {}}
            whileTap={isAnswered ? { scale: 0.98 } : {}}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              isAnswered
                ? isLastQuestion
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                : "hidden"
            }`}
          >
            {isAnswered && <CheckCircle size={20} />}
            {isLastQuestion ? 'إنهاء الاختبار' : 'السؤال التالي'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};