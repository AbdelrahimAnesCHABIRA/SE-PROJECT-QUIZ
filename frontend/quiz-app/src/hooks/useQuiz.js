import { useState } from 'react';
import axios from 'axios';

const TIMEOUT = 5000; // 5 seconds timeout
const MAX_RETRIES = 3;

export const useQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async (questions, child_id) => {
    setLoading(true);
    const source = axios.CancelToken.source();

    try {
      const stats = await Promise.all(
        questions.map(async (question) => {
          let retries = 0;
          while (retries < MAX_RETRIES) {
            try {
              const response = await axios.get(
                `http://localhost:5000/api/Quiz?child_id=${child_id}&question_id=${question._id}`,
                {
                  cancelToken: source.token,
                  timeout: TIMEOUT
                }
              );
              const doneQuizzes = response.data;

              const numAnswered = doneQuizzes.length;
              const avgScore = numAnswered > 0
                ? doneQuizzes.reduce((sum, quiz) => sum + parseFloat(quiz.score?.$numberDecimal), 0) / numAnswered
                : 0;
              const highestScore = numAnswered > 0
                ? Math.max(...doneQuizzes.map((quiz) => parseFloat(quiz.score?.$numberDecimal)))
                : 0;

              return {
                questionId: question._id,
                numAnswered,
                avgScore,
                highestScore,
              };
            } catch (error) {
              retries++;
              if (retries === MAX_RETRIES) throw error;
              await new Promise(resolve => setTimeout(resolve, 1000 * retries));
            }
          }
        })
      );
      setError(null);
      return stats;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request cancelled');
      } else {
        const errorMessage = err.response?.data?.message || 'Failed to fetch stats';
        setError(errorMessage);
        console.error('Failed to fetch stats:', err);
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createQuizInstance = async (quizInstancePayload) => {
    setLoading(true);
    const source = axios.CancelToken.source();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/Quiz',
        quizInstancePayload,
        {
          headers: { 'Content-Type': 'application/json' },
          cancelToken: source.token,
          timeout: TIMEOUT
        }
      );
      setError(null);
      return response.data;
    } catch (err) {
      if (!axios.isCancel(err)) {
        const errorMessage = err.response?.data?.message || 'Failed to create quiz instance';
        setError(errorMessage);
        console.error('Failed to create quiz instance:', err);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateQuizTemplateProgress = async (quizTemplate_id, progress) => {
    setLoading(true);
    const source = axios.CancelToken.source();

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/QuizTemplate/${quizTemplate_id}`,
        { progress },
        {
          headers: { 'Content-Type': 'application/json' },
          cancelToken: source.token,
          timeout: TIMEOUT
        }
      );
      setError(null);
      return response.data;
    } catch (err) {
      if (!axios.isCancel(err)) {
        const errorMessage = err.response?.data?.message || 'Failed to update quiz template progress';
        setError(errorMessage);
        console.error('Failed to update quiz template progress:', err);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizInstances = async (quizTemplate_id,tryNum) => {
    setLoading(true);
    const source = axios.CancelToken.source();

    try {
      const response = await axios.get(
       `http://localhost:5000/api/Quiz?fullquiz_id=${quizTemplate_id}&tryNum=${tryNum}`,
        {
          cancelToken: source.token,
          timeout: TIMEOUT
        }
      );
      setError(null);
      return response.data;
    } catch (err) {
      if (!axios.isCancel(err)) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch quiz instances';
        setError(errorMessage);
        console.error('Failed to fetch quiz instances:', err);
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchStats,
    createQuizInstance,
    updateQuizTemplateProgress,
    fetchQuizInstances,
    loading,
    error
  };
};