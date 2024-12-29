import axios from 'axios';

export const fetchRecentQuizzes = async (childId, page, limit = 12) => {
  const skip = (page - 1) * limit;
  const response = await axios.get(`http://localhost:5000/api/QuizTemplateSeeAll`, {
    params: {
      child: childId,
      limit,
      skip,
      sort: '-createdAt'
    }
  });
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'] || '0')
  };
};

// frontend/quiz-app/src/services/sectionDataService.js

export const fetchRecentFilteredQuizzes = async (childId, page, filters, limit = 12) => {
  console.log('filters:', filters);
  const skip = (page - 1) * limit;
  const response = await axios.get(`http://localhost:5000/api/QuizTemplateSeeAllFilter`, {
    params: {
      child: childId,
      limit,
      skip,
      sort: '-createdAt',
      subjects: filters.selectedSubjects?.join(','),
      chapters: filters.selectedChapters?.join(','),
      questionCount: filters.selectedQuestionCount?.join(',')
    }
  });
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'] || '0')
  };
};

// Add more section data fetchers as needed
export const getSectionDataFetcher = (section) => {
  switch (section) {
    case 'recent':
      return fetchRecentQuizzes;
    // Add more cases for different sections
    default:
      return fetchRecentQuizzes;
  }
};
