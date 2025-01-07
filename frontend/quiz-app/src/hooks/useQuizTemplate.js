import { useState } from 'react';
import axios from 'axios';

export const useQuizTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createQuizTemplate = async (quizTemplatePayload) => {
    console.log(quizTemplatePayload)
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/quizTemplate', quizTemplatePayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to create QuizTemplate');
      console.error('Failed to create QuizTemplate:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizTemplate = async (quizTemplate_id,playedCount = 0) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/QuizTemplate`, {
        params: {
          _id: quizTemplate_id,
          playedCount: playedCount,
        }
      });
      const [quizTemplate] = response.data; // Assuming the response is an array of matching QuizTemplates

      if (quizTemplate.progress === quizTemplate.questions.length) {
        const resetResponse = await axios.patch(`http://localhost:5000/api/QuizTemplate/${quizTemplate_id}`, {
          progress: 0,
          playCount: quizTemplate.playCount + 1,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return resetResponse.data;
      }

      setError(null);
      return quizTemplate;
    } catch (err) {
      setError('Failed to fetch QuizTemplate');
      console.error('Failed to fetch QuizTemplate:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizTemplatesByChildId = async (childId,playedCount) => {
    console.log(childId)
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/QuizTemplate`, {
        params: {
          child: childId,
          limit: 12,
          sort: '-createdAt',
          playedCount: playedCount,
        }
      });
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to fetch QuizTemplates for child');
      console.error('Failed to fetch QuizTemplates for child:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const fetchQuizTemplatesByChildIdSeeAll = async (childId, skip = 0) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/QuizTemplateSeeAll`, {
        params: {
          child: childId,
          limit: 12,
          skip: skip,
          sort: '-createdAt'
        }
      });
      setError(null);
      return {
        data: response.data,
        total: response.headers['x-total-count'] // Backend needs to send this
      };
    } catch (err) {
      setError('Failed to fetch QuizTemplates for child');
      console.error('Failed to fetch QuizTemplates for child:', err);
      return { data: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  return {
    createQuizTemplate,
    fetchQuizTemplate,
    fetchQuizTemplatesByChildId,
    fetchQuizTemplatesByChildIdSeeAll,
    loading,
    error,
  };
};