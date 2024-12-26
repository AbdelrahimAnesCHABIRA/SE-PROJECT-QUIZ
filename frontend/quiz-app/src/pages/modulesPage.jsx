
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModule } from '../hooks/useModule';
import ModuleCard from '../anescomponents/ModuleCard';

const ModulesPage = () => {
  const { studyLevel } = useParams();
  const { modules, loading } = useModule(studyLevel);
  const navigate = useNavigate();

  const handleBoxClick = (module_id) => {
    navigate(`/module-quizzes/${module_id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Modules for {studyLevel}</h1>
      {loading ? (
        <p>Loading modules...</p>
      ) : modules.length === 0 ? (
        <p>No modules available for the selected study level.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {modules.map((module) => (
            <ModuleCard
              key={module._id}
              moduleName={module.moduleName}
              average={'13'}
              numQuizzes={'12'}
              onclick={() => handleBoxClick(module._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
