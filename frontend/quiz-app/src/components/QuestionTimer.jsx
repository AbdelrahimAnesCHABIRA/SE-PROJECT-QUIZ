import React from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';
import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';

export const QuestionTimer = ({ startTime, isActive }) => {
  const [elapsedTime, setElapsedTime] = React.useState(0);

  React.useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isActive]);

  const duration = intervalToDuration({ start: 0, end: elapsedTime });
  const formattedTime = formatDuration(duration, { format: ['minutes', 'seconds'] });

  return (
    <motion.div
      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 1, repeat: Infinity }}
      className="flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full shrink-0"
    >
      <Timer size={14} />
      <span className="text-xs font-medium">{formattedTime}</span>
    </motion.div>
  );
};
