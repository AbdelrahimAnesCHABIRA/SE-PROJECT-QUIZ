// ...existing code...
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLevel = () => {
  const [studyLevels, setStudyLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Levels');
        setStudyLevels(response.data);
      } catch (error) {
        console.error('Error fetching study levels:', error);
        setStudyLevels([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, []);

  return {
    studyLevels,
    loading,
  };
};
// ...existing code...