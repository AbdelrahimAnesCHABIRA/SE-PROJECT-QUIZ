import { useState, useEffect } from 'react';
import axios from 'axios';

export const useModuleQuizzes = (moduleId) => {
  const [quizTemplates, setQuizTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchQuizTemplates = async () => {
      if (!moduleId) {
        setError('No module ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/QuizTemplate`, {
          params: {
            module: moduleId,
            playedCount: 0
          }
        });
        setQuizTemplates(response.data);
        setError(null);
    } catch (err) {
        setError('Error fetching quiz templates');
        console.error('Error fetching quiz templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizTemplates();
  }, [moduleId]);

  return {
    quizTemplates,
    loading,    // Removed invalid 'a' character
    error,
    setQuizTemplates
  };
};