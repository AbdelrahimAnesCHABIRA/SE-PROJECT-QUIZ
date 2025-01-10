import { useState } from 'react';
import axios from 'axios';

export const useQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestionsByTemplate = async (quizTemplate) => {
    setLoading(true);
    const questions = [];

    try {
      for (const questionId of quizTemplate.questions) {
        const response = await axios.get(`http://localhost:5000/api/Questions?_id=${questionId}`);
        if (response.status === 200) {
          questions.push(...response.data);
        }
      }
      setError(null);
      return questions;
    } catch (err) {
      setError('Error fetching questions');
      console.error('Error fetching questions:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionsByChapters = async (selectedChapters) => {
    setLoading(true);
    const allQuestions = [];

    try {
      for (const chapterId of selectedChapters) {
        const response = await axios.get(`http://localhost:5000/api/Questions?chapter_id=${chapterId}`);
        if (response.status === 200) {
          allQuestions.push(...response.data);
        }
      }
      setError(null);
      return allQuestions;
    } catch (err) {
      setError('Failed to fetch questions');
      console.error('Failed to fetch questions:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  const fetchChaptersIdByQuestionId = async (questionIds) => {
    setLoading(true);
    const allChaptersIds = [];
  
    try {
      for (const _id of questionIds) {
        const response = await axios.get(`http://localhost:5000/api/Questions?_id=${_id}`);
        if (response.status === 200 && response.data.length > 0) {
          // Assuming each question has a chapter_id field
          const question = response.data[0];
          console.log('Question:', question);
          if (question.chapterId) {
            allChaptersIds.push(question.chapterId);
          }
        }
      }
      setError(null);
      return [...new Set(allChaptersIds)]; // Return unique chapter IDs
    } catch (err) {
      setError('Failed to fetch chaptersIds');
      console.error('Failed to fetch chaptersIds', err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  return {
    fetchQuestionsByTemplate,
    fetchQuestionsByChapters,
    fetchChaptersIdByQuestionId,
    loading,
    error
  };
};