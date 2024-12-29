import axios from 'axios';

export const fetchArchiveQuizzes = async (childId, page, limit = 12) => {
  const skip = (page - 1) * limit;
  const response = await axios.get('http://localhost:5000/api/QuizTemplateSeeAll', {
    params: {
      child: childId,
      limit,
      skip,
      sort: '-createdAt',
      archive: 'true' // Pass this to get only archived quizzes
    }
  });
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'] || '0')
  };
};

