import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import StatsGrid from '../components/Stats/StatsGrid';
import QuestionList from '../components/Questions/QuestionList';
import { formatTime } from '../utils/timeFormatter';
import { useQuiz } from '../hooks/useQuiz';

const SummaryPage = () => {
  const { state } = useLocation();
  const { quizTemplate_id } = state || {};
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchQuizInstances } = useQuiz();
  const fetchedRef = useRef(false);

  const processQuizData = useCallback((instances) => {
    if (!instances?.length) return null;

    const questions = instances.map(instance => ({
      text: instance.question_id.questionText,
      score: Math.round(parseFloat(instance.score?.$numberDecimal || instance.score || 0) * 20),
      time: Math.round(instance.time_taken || 0)
    }));

    const averageScore = questions.reduce((acc, q) => acc + q.score, 0) / questions.length;
    const totalTime = questions.reduce((acc, q) => acc + q.time, 0);

    return {
      averageScore,
      totalTime,
      questions
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchedRef.current || !quizTemplate_id) return;

      try {
        fetchedRef.current = true;
        const instances = await fetchQuizInstances(quizTemplate_id, -1);
        const processedData = processQuizData(instances);
        setQuizData(processedData);
      } catch (error) {
        console.error('Failed to fetch quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizTemplate_id, fetchQuizInstances, processQuizData]);

  // Translated text for Arabic content
  if (loading) {
    return <div className="flex justify-center items-center h-screen">جاري التحميل...</div>;
  }

  if (!quizData) {
    return <div className="text-center p-4">لا توجد بيانات متوفرة عن الاختبار</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <main className="max-w-2xl mx-auto p-4">
        <StatsGrid
          averageScore={quizData.averageScore}
          totalTime={formatTime(quizData.totalTime)}
          totalQuestions={quizData.questions.length}
          statsLabels={{
            averageScore: 'المعدل',
            totalTime: 'الوقت الإجمالي',
            totalQuestions: 'عدد الأسئلة'
          }}
        />
        <QuestionList 
          questions={quizData.questions} 
          questionLabel="السؤال" 
          scoreLabel="النتيجة" 
          timeLabel="الوقت المستغرق"
        />
      </main>
    </div>
  );
};

export default SummaryPage;
