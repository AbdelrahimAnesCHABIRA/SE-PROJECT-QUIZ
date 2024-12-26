import { useQuestion } from './useQuestion';
import { useNavigate } from 'react-router-dom';

export const useHandleBoxClick = () => {
    const { fetchQuestionsByTemplate } = useQuestion();
    const navigate = useNavigate();

    const handleBoxClick = async (quizTemplate) => {
        const questions = await fetchQuestionsByTemplate(quizTemplate);
        navigate('/quiz', {
            state: { questions, quizTemplate_id: quizTemplate._id },
        });
    };

    return handleBoxClick;
};