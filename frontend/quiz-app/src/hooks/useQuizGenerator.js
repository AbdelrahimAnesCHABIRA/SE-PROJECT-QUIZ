import { useState } from 'react';
import axios from 'axios';
import {useModule} from './useModule';
import  useChapters  from './useChapters';
import { useChildSession } from './useChildSession';

export const useQuizGenerator = () => {
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [mcqs, setMcqs] = useState([]);
  const [QuizName, setQuizName] = useState('Custom Quiz');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [validationError, setValidationError] = useState('');
  const { childId, studyLevel } = useChildSession();
  const { modules: availableModules } = useModule(studyLevel);
  
  const { chapters, fetchChaptersBase } = useChapters(selectedModule);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    if (QuizName.trim() === '') {
      setError('Please enter a Quiz Name');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('numQuestions', numQuestions);
    formData.append('quizName', QuizName);
    formData.append('moduleId', selectedModule);
    formData.append('chapterId', selectedChapter);
    formData.append('childId', childId);
    formData.append('title', QuizName);

    try {
      const response = await axios.post('http://localhost:5000/api/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMcqs(response.data.quizId);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    numQuestions,
    mcqs,
    loading,
    error,
    QuizName,
    chapters,
    selectedModule,
    selectedChapter,
    availableModules,
    validationError,
    setQuizName,
    setNumQuestions,
    setSelectedModule,
    setSelectedChapter,
    setValidationError,
    handleFileChange,
    handleSubmit,
    fetchChaptersBase,
  };
};