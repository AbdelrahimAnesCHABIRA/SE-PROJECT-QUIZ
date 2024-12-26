import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-8 text-center">
      {title}
    </h1>
  );
};

export default PageTitle;
