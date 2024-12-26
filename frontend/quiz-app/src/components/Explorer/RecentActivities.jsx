import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QuizCard } from '../quiz/quizcard/QuizCard';
import { useQuizTemplate } from '../../hooks/useQuizTemplate';
import { useHandleBoxClick } from '../../hooks/handleBoxClick';


export const RecentActivities = () => {

  const childId = '64a2c4a5b7e2d5e37e9fc314';//take it from the context or the session
  const { t } = useTranslation();
  const [quizzes, setQuizzes] = useState([]);
  const { fetchQuizTemplatesByChildId, loading, error } = useQuizTemplate();
  const handleBoxClick = useHandleBoxClick();




  useEffect(() => {
    const loadQuizzes = async () => {
      const fetchedQuizzes = await fetchQuizTemplatesByChildId(childId,1);
      if (fetchedQuizzes) {
        setQuizzes(fetchedQuizzes);
      }
    };
    loadQuizzes();
  }, [childId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(quizzes);
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
        {
        quizzes
          .sort((a, b) => b.progress - a.progress)
          .map((quiz,index) => (
          <QuizCard 
            key={index} 
            id={quiz._id}
            title={quiz.title}
            totalQuestions={quiz.questions.length}
            answeredQuestions={quiz.progress}
            imageUrl={quiz.imageUrl || "https://th.bing.com/th/id/OIP.gWOiWm7jk5xYn8vkXme75wHaHa?rs=1&pid=ImgDetMain"}
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