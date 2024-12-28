import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CountdownOverlay = ({ isVisible, onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  const getMessage = () => {
    switch (count) {
      case 0:
        return 'GO!';
      case 1:
        return '1';
      case 2:
        return '2';
      case 3:
        return '3';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.2, 1],
              opacity: [0, 1, count === 0 ? 0 : 1]
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`text-8xl font-bold ${
              count === 0 ? 'text-green-500' : 'text-white'
            }`}
          >
            {getMessage()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};