import { useState, useEffect } from 'react';
import axios from 'axios';

export const useModule = (studyLevel) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Modules?level=${studyLevel}`);
        
        setModules(response.data || []);
      } catch (error) {
        console.error("Error fetching modules:", error);
        setModules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [studyLevel]);

  return { 
    modules,
    loading,
  };
};
