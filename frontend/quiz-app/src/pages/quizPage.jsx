import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MCQQuestion } from '../quizcomponents/MCQQuestion';
import { BottomBar } from '../quizcomponents/BottomBar';
import { useQuiz } from '../hooks/useQuiz';
import { useQuizTemplate } from '../hooks/useQuizTemplate';
import { QuizStartCard } from '../components/quiz/QuizStartCard';
import  Spinner  from '../components/spinner/Spinner';
import { useChildSession } from '../hooks/useChildSession';
import { useUser } from '../hooks/useUser';
import { useChild } from '../hooks/useChild';

const QuizPage = () => {
    const { state } = useLocation(); // Access navigation state
    const { questions, quizTemplate_id } = state || { questions: [], quizTemplate_id: null }; // Extract questions list and FullQuiz ID
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState([]); // To track scores for each question
    const [selectedScore, setSelectedScore] = useState(null); // Track the selected score for the current question
    const {userId, childId, studyLevel, sessionError, sessionLoading } = useChildSession();
    const {child, childError, childLoading } = useChild();
    const navigate = useNavigate();
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizTemplate, setQuizzTemplate] = useState(null);
    const { createQuizInstance, updateQuizTemplateProgress } = useQuiz();
    const { fetchQuizTemplate } = useQuizTemplate();
    const [hasStarted, setHasStarted] = useState(false);
    
    useEffect(() => {
        const fetchTemplate = async () => {
            const qt = await fetchQuizTemplate(quizTemplate_id);
            setQuizzTemplate(qt);
            setCurrentQuestionIndex(qt.progress);
        };
        fetchTemplate();
    }, [quizTemplate_id]);
 
    useEffect(() => {
        console.log('QuizTemplate:', quizTemplate);
        console.log('child: ' , child)
    }, [quizTemplate]);

    if (!questions.length) return <p>No questions available.</p>;

    const currentQuestion = questions[currentQuestionIndex];

    const handleScore = (score) => {
        setSelectedScore(score); // Mark the button as selected
    };
    const handleOnBack = () => {
        navigate('/explorer'); // Navigate back to the home page
    };

    const handleNextQuestion = async () => {
        if (!selectedScore) {
            alert('Please select a score before proceeding.');
            return;
        }

        try {
            const tryNum = quizTemplate.playCount;
            console.log('Try number fetched:', tryNum);
            console.log('trying to create quiz instance with :' + currentQuestion._id + " , " + childId + " , " + quizTemplate_id + " , " + selectedScore + ' , ' + tryNum);

            // Create a quiz instance in the backend
            const quizInstancePayload = {
                question_id: currentQuestion._id,
                child_id: childId,
                fullquiz_id: quizTemplate_id, // Associate the quiz instance with the FullQuiz
                score: selectedScore,
                tryNum: tryNum
            };

            const quizInstance = await createQuizInstance(quizInstancePayload);

            if (!quizInstance) {
                throw new Error('Failed to save quiz instance');
            }

            // Update the FullQuiz score dynamically
            const updatedQuizTemplate = await updateQuizTemplateProgress(quizTemplate_id, currentQuestionIndex + 1);

            if (!updatedQuizTemplate) {
                throw new Error('Failed to update quiz template progress');
            }

            console.log('QuizTemplate progress updated successfully');

            // Move to the next question
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedScore(null); // Reset selected score for the new question
            } else {
                navigate('/summary-page', { state: { quizTemplate_id, tryNum } }); // Navigate to summary page if required
            }
        } catch (error) {
            console.error('Error saving quiz instance or updating FullQuiz score:', error);
            alert('Error saving quiz instance or updating FullQuiz score. Please try again.');
        }
    };
    if (!hasStarted) {
        // Check if quiz template is still loading
        if (!quizTemplate) {
            return (
                <div className="loading-container">
                    <Spinner />
                </div>
            );
        }
    
        // Once loaded, show the start card
        return (
            <QuizStartCard 
                quiz={quizTemplate}
                onStart={() => setHasStarted(true)}
                onBack={handleOnBack}
            />
        );
    }

    return (
        <div>
            <h1>Quiz</h1>
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
            <div className="h-screen overflow-y-auto">
                <MCQQuestion 
                    question={currentQuestion}
                    handleScore={handleScore}
                    setIsAnswered={setIsAnswered}
                />
                <BottomBar
                    userName={child.firstName + " " + child.lastName}
                    onNextQuestion={handleNextQuestion}
                    isAnswered={isAnswered}
                    isLastQuestion={currentQuestionIndex == questions.length - 1}
                    avatarUrl={child.imageUrl}
                />
            </div>
        </div>
    );
};

export default QuizPage;