import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QuizCard } from '../quiz/quizcard/QuizCard';
import { useQuizTemplate } from '../../hooks/useQuizTemplate';
import { useHandleBoxClick } from '../../hooks/handleBoxClick';
import axios from 'axios';

export const RecentActivities = () => {
  const { t } = useTranslation();
  const [childId, setChildId] = useState(null);
  const [studyLevel, setStudyLevel] = useState(null); 
  const [quizzes, setQuizzes] = useState([]);
  const [sessionError, setSessionError] = useState(null);
  const { fetchQuizTemplatesByChildId, loading, error } = useQuizTemplate();
  const handleBoxClick = useHandleBoxClick();

  // Fetch the childId from the session
  useEffect(() => {
    const fetchChildIdFromSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/Child/session", {
          withCredentials: true, // Ensure cookies are sent
        });
        
        setChildId(res.data.childId);
        console.log("here"+childId)
        setStudyLevel(res.data.studyLevel); 
        setSessionError(null);
      } catch (err) {
        console.error("Error fetching childId from session:", err);
        setSessionError(err.response?.data?.error || "Unable to fetch session data");
      }
    };
    fetchChildIdFromSession();
  }, []);

  // Fetch quizzes based on childId
  useEffect(() => {
    const loadQuizzes = async () => {
      if (!childId) return; // Don't fetch quizzes if childId is null
      const fetchedQuizzes = await fetchQuizTemplatesByChildId(childId, 1);
      if (fetchedQuizzes) {
        setQuizzes(fetchedQuizzes);
      }
    };
    loadQuizzes();
  }, [childId]);

  // Handle errors
  if (loading) return <div>Loading...</div>;
  if (error || sessionError) return <div>Error: {error || sessionError}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{t('explorer.recentActivity')}</h2>
        <Link
          to="/see-all?section=recent"
          className="text-blue-600 hover:text-blue-700 font-medium p-3 rounded-3xl hover:bg-gray-300"
        >
          {t('explorer.seeAll')}
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes
          .sort((a, b) => b.progress - a.progress)
          .map((quiz, index) => (
            <QuizCard
              key={index}
              id={quiz._id}
              title={quiz.title}
              totalQuestions={quiz.questions.length}
              answeredQuestions={quiz.progress}
              imageUrl={
                quiz.imageUrl ||
                "https://th.bing.com/th/id/OIP.gWOiWm7jk5xYn8vkXme75wHaHa?rs=1&pid=ImgDetMain"
              }
              year={quiz.year}
              className={quiz.className}
              playCount={quiz.playCount}
              onClick={() => handleBoxClick(quiz)}
            />
          ))}
      </div>
    </div>
  );
};
