import { useTranslation } from 'react-i18next';
import { QuizCard } from '../quiz/quizcard/QuizCard';
import { useNavigate } from 'react-router-dom';

export const ArchiveList = ({ items }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  
  const handleBoxClick = async (quizTemplate) => {
    const questions = quizTemplate.questions;
    navigate('/quiz', {
        state: { questions, quizTemplate_id: quizTemplate._id },
    });}

  console.log(items);
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t('archive.noQuizzes')}
        </h2>
        <p className="text-gray-600">
          {t('archive.startQuiz')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.sort((a, b) => b.progress - a.progress)
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
  );
};