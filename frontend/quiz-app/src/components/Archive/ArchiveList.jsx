import { useTranslation } from 'react-i18next';
import { QuizCard } from '../quiz/quizcard/QuizCard';

export const ArchiveList = ({ items }) => {
  const { t } = useTranslation();

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
      {items.map((quiz) => (
        <QuizCard key={quiz.id} {...quiz} />
      ))}
    </div>
  );
};