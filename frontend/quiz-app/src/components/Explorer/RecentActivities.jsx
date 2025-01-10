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

  // Fetch session data on component mount
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const sessionRes = await axios.get("http://localhost:5000/api/Child/session", {
          withCredentials: true, // Ensure cookies are sent
        });
        const fetchedChildId = sessionRes.data.childId;
        setChildId(fetchedChildId);
        setStudyLevel(sessionRes.data.studyLevel);
        setSessionError(null);
      } catch (err) {
        console.error("Error fetching session data:", err);
        setSessionError(err.response?.data?.error || "Unable to fetch session data");
      }
    };

    fetchSessionData();
  }, []); // Only run once on mount

  // Fetch quizzes whenever `childId` changes
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (childId) {
        try {
          const fetchedQuizzes = await fetchQuizTemplatesByChildId(childId, 1);
          if (fetchedQuizzes) {
            setQuizzes(fetchedQuizzes);
          }
        } catch (err) {
          console.error("Error fetching quizzes:", err);
          setSessionError(err.response?.data?.error || "Unable to fetch quizzes data");
        }
      }
    };

    fetchQuizzes();
  }, [childId]); // Run whenever `childId` changes

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
