import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { BookOpen, BarChart } from 'lucide-react';

export const ModuleCard = ({ moduleName, numQuizzes, average, onclick }) => {
  // const navigate = useNavigate();
  // const { updatemoduleProgress } = usemoduleActions();

  // useEffect(() => {cd 
  //   updatemoduleProgress(module.id);
  // }, [module.id]);

  return (
    <div
      onClick={onclick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-2xl font-bold text-white mb-2">{moduleName}</h3>
          <p className="text-white/90 line-clamp-2">description will be here</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <BookOpen size={16} />
              <span className="text-sm">Quizzes</span>
            </div>
            <p className="text-lg font-semibold text-black">{numQuizzes}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <BarChart size={16} />
              <span className="text-sm">Average</span>
            </div>
            <p className="text-lg font-semibol text-black">{average}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;