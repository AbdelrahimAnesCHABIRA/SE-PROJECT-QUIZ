import { useState } from 'react';

export const useArchiveFilters = () => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    subjects: [],
    dateRange: { start: '', end: '' },
    scoreRange: { min: 0, max: 100 },
    completed: true
  });

  const filterHandlers = {
    setSubjects: (subjects) => {
      setFilters(prev => ({ ...prev, subjects }));
    },
    setDateRange: (dateRange) => {
      setFilters(prev => ({ ...prev, dateRange }));
    },
    setScoreRange: (scoreRange) => {
      setFilters(prev => ({ ...prev, scoreRange }));
    },
    setCompleted: (completed) => {
      setFilters(prev => ({ ...prev, completed }));
    },
    resetFilters: () => {
      setFilters({
        subjects: [],
        dateRange: { start: '', end: '' },
        scoreRange: { min: 0, max: 100 },
        completed: true
      });
    }
  };

  const toggleFilterPanel = () => setIsFilterPanelOpen(prev => !prev);

  return {
    filters,
    filterHandlers,
    isFilterPanelOpen,
    toggleFilterPanel
  };
};