import React from 'react';
import { motion } from 'framer-motion';

const PageTitle = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        {title}
      </h1>
    </motion.div>
  );
};

export default PageTitle;