import axios from 'axios';
import { useState } from 'react';
import { useCallback } from 'react';
const useChapters = (moduleId, childId) => {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchChapters = async () => {
        if (!moduleId || !childId) return;
        
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:5000/api/Chapters?module_id=${moduleId}`);
            
            const chaptersWithStats = await Promise.all(
                data.map(async (chapter) => {
                    const { data: stats } = await axios.get(
                        `/api/ChapterStats?chapter_id=${chapter._id}&child_id=${childId}`
                    );
                    return { ...chapter, stats };
                })
            );
            
            setChapters(chaptersWithStats);
            setError(null);
        } catch (err) {
            setError('Failed to fetch chapters. Please try again later.');
            console.error('Failed to fetch chapters:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchChaptersBase = useCallback(async () => {
        if (!moduleId) return;
        
        try {
          setLoading(true);
          const { data } = await axios.get(`http://localhost:5000/api/Chapters?module_id=${moduleId}`);
          setChapters(data);
          setError(null);
        } catch (err) {
          setError('Failed to fetch chapters. Please try again later.');
          console.error('Failed to fetch chapters:', err);
          setChapters([]);
        } finally {
          setLoading(false);
        }
      }, [moduleId]);

    return { chapters, loading, error, fetchChapters, fetchChaptersBase };
};

export default useChapters;