import axios from "axios";

export const fetchRecentQuizzes = async (childId, page, limit = 12) => {
  const skip = (page - 1) * limit;
  const response = await axios.get(
    `http://localhost:5000/api/QuizTemplateSeeAll`,
    {
      params: {
        child: childId,
        limit,
        skip,
        sort: "-createdAt",
      },
    }
  );
  return {
    data: response.data,
    total: parseInt(response.headers["x-total-count"] || "0"),
  };
};

// frontend/quiz-app/src/services/sectionDataService.js

export const fetchRecentFilteredQuizzes = async (
  childId,
  page,
  filters,
  limit = 12
) => {
  const skip = (page - 1) * limit;
  const response = await axios.get(
    `http://localhost:5000/api/QuizTemplateSeeAllFilter`,
    {
      params: {
        child: childId,
        limit,
        skip,
        sort: "-createdAt",
        subjects: filters.selectedSubjects?.join(","),
        chapters: filters.selectedChapters?.join(","),
        questionCount: filters.selectedQuestionCount?.join(","),
      },
    }
  );
  return {
    data: response.data,
    total: parseInt(response.headers["x-total-count"] || "0"),
  };
};

export const fetchAllQuestions = async (Level, page, filters = {}, limit = 24) => {
  try {
   
    const response = await axios.get(`http://localhost:5000/api/AllQuestions`, {
      params: {
        studyLevel: Level,
        page,
        limit,
        subjects: filters?.selectedSubjects?.length ? filters.selectedSubjects.join(",") : undefined,
        chapters: filters?.selectedChapters?.length ? filters.selectedChapters.join(",") : undefined,
        questionCount: filters?.selectedQuestionCount?.length ? filters.selectedQuestionCount.join(",") : undefined
      },
    });

    console.log('Raw response:', response.data); // Debug log

    if (!response.data.results) {
      console.warn('No results in response:', response.data);
      return { data: [], total: 0 };
    }

    return {
      data: response.data.results,
      total: response.data.totalItems || 0,
      totalPages: response.data.totalPages || 0
    };
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
// Add more section data fetchers as needed
export const getSectionDataFetcher = (section) => {
  switch (section) {
    case "recent":
      return fetchRecentQuizzes;
    // Add more cases for different sections
    default:
      return fetchRecentQuizzes;
  }
};
