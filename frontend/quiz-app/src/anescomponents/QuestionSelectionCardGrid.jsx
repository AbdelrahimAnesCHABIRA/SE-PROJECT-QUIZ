import { QuestionSelectionCard } from "./QuestionSelectionCard";

// Sample data array of questions
const sampleQuestions = [
    {
        id: 1,
        text: "What is the capital of France?",
        stats: {
            totalAttempts: 100,
            correctCount: 80,
            averageTimeSpent: 5000,
            hintsUsed: 10,
        },
    },
    {
        id: 2,
        text: "What is 2 + 2?",
        stats: {
            totalAttempts: 50,
            correctCount: 45,
            averageTimeSpent: 2000,
            hintsUsed: 5,
        },
    },
    // Add more questions as needed
];

export const QuestionSelectionCardGrid = ({
    questions = sampleQuestions, // Default to sampleQuestions if no questions prop is provided
    selectedQuestions = [], // Default to an empty array if no selectedQuestions prop is provided
    onQuestionToggle,
    disabled,
    }) => {
    return (
        <div>
            <div className="mb-4 text-gray-700">
                Total Questions: {questions.length} | Selected: {selectedQuestions.length}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-5">
                {questions.map((question) => (
                    <QuestionSelectionCard
                        key={question.id}
                        question={question}
                        stats={question.stats}
                        isSelected={selectedQuestions.includes(question.id)}
                        onToggle={() => {}}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
}