import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionScore from '../components/questionScore';
import PageTitle from '../components/pageTitle';
import SpeedTracker from '../components/SpeedTracker';
import { useQuiz } from '../hooks/useQuiz';

const SummaryPage = () => {
    const { state } = useLocation();
    const { quizTemplate_id } = state || {};
    const [quizInstances, setQuizInstances] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { fetchQuizInstances } = useQuiz();

    useEffect(() => {
        if (!quizTemplate_id) {
            setError('No FullQuiz ID provided.');
            setLoading(false);
            return;
        }

        const fetchInstances = async () => {
            const data = await fetchQuizInstances(quizTemplate_id);
            setQuizInstances(data);
        };

        fetchInstances();
    }, [quizTemplate_id, fetchQuizInstances]);

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Calculate average score
    const averageScore =
    quizInstances.length > 0
        ? quizInstances.reduce((acc, curr) => {
              const score = parseFloat(curr.score?.$numberDecimal || curr.score || 0);
              return acc + score;
          }, 0) / quizInstances.length
        : 0;

    return (
        <div>
            <PageTitle title={'Quiz Summary'}></PageTitle>
            {quizInstances.map((quiz, index) => (
                <QuestionScore key={index} question={quiz.question_id.questionText || 'Question not found'} score={quiz.score?.$numberDecimal || quiz.score || 'N/A'}></QuestionScore>
             ))}

            <SpeedTracker
                value={averageScore.toFixed(2)}
            />

            <button
                onClick={() => navigate('/')}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Go to Home
            </button>
        </div>
    );
};

export default SummaryPage;