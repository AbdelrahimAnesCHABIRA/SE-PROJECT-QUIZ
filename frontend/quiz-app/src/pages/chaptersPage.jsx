import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useChapters from '../hooks/useChapters';

const ChaptersPage = () => {
    const [selectedChapters, setSelectedChapters] = useState([]); // To store selected chapter IDs
    const { module_id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const childId = '64a2c4a5b7e2d5e37e9fc314';
    const { chapters, loading, error, fetchChapters } = useChapters(module_id, childId);
    
    
    
    useEffect(() => {
        if (!isLoaded) {
            fetchChapters();
            setIsLoaded(true);
        }
    }, [isLoaded, fetchChapters]);

    const toggleChapterSelection = (chapter_id) => {
        setSelectedChapters((prevSelected) => {
            if (prevSelected.includes(chapter_id)) {
                return prevSelected.filter((id) => id !== chapter_id); // Deselect if already selected
            } else {
                return [...prevSelected, chapter_id]; // Add to selection
            }
        });
    };

    const handleNextClick = () => {
        if (selectedChapters.length === 0) {
            alert('Please select at least one chapter.');
            return;
        }
        navigate('/select-questions', { state: { selectedChapters, module_id } });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Chapters</h1>
            {loading && <p>Loading chapters...</p>}
            {error && <p>{error}</p>}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                }}
            >
                {chapters.map((chapter) => (
                    <div
                        key={chapter._id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '15px',
                            textAlign: 'center',
                            backgroundColor: selectedChapters.includes(chapter._id) ? '#d1e7dd' : '#f9f9f9',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer',
                        }}
                        onClick={() => toggleChapterSelection(chapter._id)}
                    >
                        <h3 style={{ margin: '10px 0' }}>{chapter.chapterName}</h3>
                        {chapter.stats ? (
                            <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555' }}>
                                <p>Full Quizzes: {chapter.stats.numFullQuizzes || 0}</p>
                                <p>Average Score: {chapter.stats.avgScore?.$numberDecimal || '0.00'}</p>
                                <p>Highest Score: {chapter.stats.highestScore?.$numberDecimal || 0}</p>
                            </div>
                        ) : (
                            <p>Loading stats...</p>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={handleNextClick}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Next
            </button>
        </div>
    );
};

export default ChaptersPage;