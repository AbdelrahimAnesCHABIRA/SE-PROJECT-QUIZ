import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { QuizCard } from '../quiz/quizcard/QuizCard';

export const TrendingSection = () => {
  const { t } = useTranslation();
  
  const quizzes = [
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 10,
      imageUrl:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8ddfe70-0b23-4aef-8d58-769268414fcb/dfnt9is-daf3de3d-bdbf-4994-8e69-0e1bbf9e31ae.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q4ZGRmZTcwLTBiMjMtNGFlZi04ZDU4LTc2OTI2ODQxNGZjYlwvZGZudDlpcy1kYWYzZGUzZC1iZGJmLTQ5OTQtOGU2OS0wZTFiYmY5ZTMxYWUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.jyf3wkd8rRDa7U6J32C6uLoTeTf7Dd5-U9FZV8JpixI",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{t('explorer.trending')}</h2>
        <Link 
          to="/see-all?section=trending" 
          className="text-blue-600 hover:text-blue-700 font-medium p-3 rounded-3xl hover:bg-gray-300"
        >
          {t('explorer.seeAll')}
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes.map((item, index) => (
          <QuizCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};