
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubjectCard from '../components/SubjectCard';
import { useLevel } from '../hooks/useLevel';

const StudyLevelsPage = () => {
  const { studyLevels, loading } = useLevel();
  const navigate = useNavigate();
  console.log(studyLevels);
  const handleBoxClick = (studyLevel) => {
    navigate(`/modules/${studyLevel}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Study Levels</h1>
      {loading ? (
        <p>Loading levels...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {studyLevels.map((level, index) => (
            <SubjectCard
              key={index}
              id={level}
              name={level}
              year="2024"
              onClick={() => handleBoxClick(level)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyLevelsPage;
