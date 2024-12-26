import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {QuizCard} from '../quiz/quizcard/QuizCard';

export const NewSection = () => {
  const { t } = useTranslation();
  
  const quizzes = [
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 1,
      title: " الفصل الأول: المقدمة",
      totalQuestions: 10,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "رياضيات الاولى ابتدائي",
    },
    {
      id: 2,
      title: " الفصل الثاني: الأعداد من 1 إلى 10",
      totalQuestions: 12,
      answeredQuestions: 0,
      imageUrl:
        "https://images8.alphacoders.com/135/1352217.png",
      year: "2021",
      className : "الاولى ابتدائي",
    },
  ];
  const limitedQuizzes = quizzes.slice(0, 12);
  return (
    <div className="mb-12">
      <div className="flex  items-center justify-between mb-6">
        <h2 className="text-xl text-right font-semibold text-gray-900">{t('explorer.newContent')}</h2>
        <Link 
          to="/see-all?section=new" 
          className="text-blue-600 hover:text-blue-700 p-3 rounded-3xl hover:bg-gray-300 font-medium"
        >
          {t('explorer.seeAll')}
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {limitedQuizzes.map((quiz,index) => (

          <QuizCard key={index} {...quiz} />
        ))}
      </div>
    </div>
  );
};