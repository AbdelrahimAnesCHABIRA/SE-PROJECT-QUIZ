import { useModule } from './useModule';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const useFilters = (level, childId) => {
  console.log("the level passed to usefilters : "+ level);
  console.log("the child id passed to usefilters: " + childId);
  const { modules, loading: modulesLoading } = useModule(level);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState([]);
  const [allChaptersData, setAllChaptersData] = useState({});


  useEffect(() => {
    if (modules && modules.length > 0) {
      const transformedSubjects = modules.map(module => ({
        value: module._id,
        label: module.moduleName
      }));
      setSubjects(transformedSubjects);
    }
  }, [modules]);

  // Fetch chapters for all selected modules (manual loop, no custom hooks inside)
  useEffect(() => {
    const loadAllChapters = async () => {
      const newChaptersData = {};

      for (const moduleId of selectedSubjects) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/Chapters?module_id=${moduleId}&child_id=${childId}`
          );
          if (res.data && Array.isArray(res.data)) {
            newChaptersData[moduleId] = res.data.map(chapter => ({
              value: chapter._id,
              label: chapter.chapterName,
              moduleId: chapter.moduleId
            }));
          }
        } catch (error) {
          console.error('Failed to fetch chapters:', error);
        }
      }

      setAllChaptersData(prev => ({
        ...prev,
        ...newChaptersData
      }));
    };

    loadAllChapters();
  }, [selectedSubjects, childId]);

  // Combine all chapters into single array
  const combinedChapters = useMemo(() => {
    return Object.values(allChaptersData).flat();
  }, [allChaptersData]);

  // Clean up chapters when modules are deselected
  useEffect(() => {
    setAllChaptersData(prev => {
      const newData = { ...prev };
      Object.keys(newData).forEach(moduleId => {
        if (!selectedSubjects.includes(moduleId)) {
          delete newData[moduleId];
        }
      });
      return newData;
    });
  }, [selectedSubjects]);
  const getSelectedFilterLabels = () => {
    return selectedSubjects.map(value => {
      const subject = subjects.find(s => s.value === value);
      return { value, label: subject?.label || value };
    });
  };

  return {
    subjects,
    chapters: combinedChapters,
    selectedSubjects,
    selectedChapters,
    selectedQuestionCount,
    onSubjectsChange: setSelectedSubjects,
    onChaptersChange: setSelectedChapters,
    onQuestionCountChange: setSelectedQuestionCount,
    getSelectedFilterLabels,
    loading: modulesLoading
  };
};