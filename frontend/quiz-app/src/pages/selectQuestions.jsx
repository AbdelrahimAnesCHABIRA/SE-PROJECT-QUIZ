import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QuestionSelectionCard } from '../anescomponents/QuestionSelectionCard';
import Button from '../anescomponents/Button';
import { InputField } from '../anescomponents/InputField';
import { useQuestion } from '../hooks/useQuestion';
import { useQuiz } from '../hooks/useQuiz';
import { useQuizTemplate } from '../hooks/useQuizTemplate';

const QuestionsSelectionPage = () => {
    const { state } = useLocation(); // Access the passed selectedChapters
    const { selectedChapters, module_id } = state || { selectedChapters: [], module_id: null };
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [randomQuestionCount, setRandomQuestionCount] = useState(0);
    const [questionStats, setQuestionStats] = useState([]); // Stores stats for each question
    const child_id = '64a2c4a5b7e2d5e37e9fc314';
    const { fetchQuestionsByChapters } = useQuestion();
    const { fetchStats, loading, error } = useQuiz();
    const { createQuizTemplate } = useQuizTemplate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    
        const fetchQuestions = async () => {
            try {
                if (selectedChapters.length > 0) {
                    const allQuestions = await fetchQuestionsByChapters(selectedChapters);
                    if (isMounted) {
                        setQuestions(allQuestions);
                    }
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
    
        fetchQuestions();
    
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [selectedChapters]); 

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    
        const fetchQuestionStats = async () => {
            try {
                if (questions.length > 0 && isMounted) {
                    const stats = await fetchStats(questions, child_id);
                    if (isMounted) {
                        setQuestionStats(stats);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching question stats:', error);
                }
            }
        };
    
        fetchQuestionStats();
    
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [questions, fetchStats, child_id]);

    const toggleQuestionSelection = (questionId) => {
        setSelectedQuestions((prev) =>
            prev.includes(questionId)
                ? prev.filter((id) => id !== questionId) // Deselect if already selected
                : [...prev, questionId] // Select if not already selected
        );
    };

    const randomizeQuestions = () => {
        if (randomQuestionCount <= 0 || randomQuestionCount > questions.length) {
            alert(`Please select a number between 1 and ${questions.length}`);
            return;
        }

        const shuffled = [...questions].sort(() => 0.5 - Math.random()); // Shuffle questions
        const randomizedSelection = shuffled.slice(0, randomQuestionCount).map((q) => q._id);

        setSelectedQuestions(randomizedSelection);
    };

    const startQuiz = async () => {
        if (selectedQuestions.length === 0) {
            alert('Please select at least one question to start the quiz.');
            return;
        }
    
        try {
            // Create the QuizTemplate instance payload
            const quizTemplatePayload = {
                title: 'Custom Quiz', // Default title, can be customized dynamically
                module: module_id,
                child: child_id,
                questions: selectedQuestions,
                chapters: selectedChapters,
            };
    
            // Call the createQuizTemplate function from useQuizTemplate hook
            const quizTemplate = await createQuizTemplate(quizTemplatePayload);
    
            if (!quizTemplate) {
                throw new Error('Failed to create QuizTemplate');
            }
    
            // Navigate to the Quiz page using the QuizTemplate ID
            const selectedQuestionsData = questions.filter((q) =>
                selectedQuestions.includes(q._id)
            );
    
            navigate('/quiz', {
                state: { questions: selectedQuestionsData, quizTemplate_id: quizTemplate._id },
            });
        } catch (err) {
            console.error('Failed to start quiz:', err);
            alert('Failed to start quiz. Please try again later.');
        }
    };
    

    return (
        <div style={{ padding: '20px' }}>
            <h1>Select Questions</h1>
            <div style={{ marginBottom: '20px' }}>
                <InputField
                    label={'Enter the number of questions'}
                    onChange={(e) => setRandomQuestionCount(parseInt(e.target.value, 10) || 0)}
                    placeholder={`Enter a number (1-${questions.length})`}
                    type='number'
                    value={randomQuestionCount}
                    htmlFor={'number of questions'}
                />
                
                <Button
                    onclick={randomizeQuestions}
                    text={'Randomize'}
                />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5" >
                {questions.map((question,index) => {
                    const stats = questionStats.find((stat) => stat.questionId === question._id) || {};
                    return (
                        <QuestionSelectionCard 
                        key={index}
                            questionText={question.questionText}
                            stats={stats}
                            isSelected={selectedQuestions.includes(question._id)}
                            onToggle={() => toggleQuestionSelection(question._id)}
                        />
                    );
                })}
            </div>
            <Button
                onclick={startQuiz}
                text={"Start Quiz"}
                
            />

        </div>
    );
};

export default QuestionsSelectionPage;