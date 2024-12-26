import { useParams, useNavigate } from 'react-router-dom';
import Button from '../anescomponents/Button';
import { useModuleQuizzes } from '../hooks/useModuleQuizzes';
import { useQuestion } from '../hooks/useQuestion';

const ModuleQuizzesPage = () => {
    const navigate = useNavigate();
    const { module_id } = useParams();
    const { quizTemplates, loading, error } = useModuleQuizzes(module_id);
    const { fetchQuestionsByTemplate } = useQuestion();

    const handleCreateQuizTemplate = () => {
        navigate(`/chapters/${module_id}`);
    };

    const handleBoxClick = async (quizTemplate) => {
        const questions = await fetchQuestionsByTemplate(quizTemplate);
        navigate('/quiz', {
            state: { questions, quizTemplate_id: quizTemplate._id },
        });
    };

    if (!module_id) {
        return <p>Error: No module ID provided.</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    //we need to handle the error here 
    // if (error) {
    //     return <p>Error here: {error}</p>;
    // }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Quiz Templates</h1>
            <div style={{ marginBottom: '20px' }}>
                <Button
                    onclick={handleCreateQuizTemplate}
                    text={'Create New Quiz Template'}
                />
            </div>
            {quizTemplates.length > 0 ? (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px',
                    }}
                >
                    {quizTemplates.map((template) => (
                        <div
                            onClick={() => handleBoxClick(template)}
                            key={template._id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                padding: '15px',
                                textAlign: 'center',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h3>{template.title}</h3>
                            <p>Module ID: {template.module}</p>
                            <p>Played Count: {template.playCount}</p>
                            <p>Progress: {template.progress} questions answered</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No quiz templates available for this module.</p>
            )}
        </div>
    );
};

export default ModuleQuizzesPage;