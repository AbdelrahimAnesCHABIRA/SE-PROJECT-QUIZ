import React, { useState } from 'react';
import { MCQQuestion } from './MCQQuestion.jsx';
import { BottomBar } from './BottomBar.jsx';

const USER_DATA = {
  name: "Abdelrahim Chabira",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
};

export default function QuizContent() {
  const [progress, setProgress] = useState({
    currentQuestionIndex: 0,
    answers: [],
    hintsRemaining: 3,
  });
  const [isAnswered, setIsAnswered] = useState(false);  // Add this state

  const quiz = {
    questions: [
      {
        id: "q1",
        text: "What is the capital of France?",
        imageUrl: "",
        hint: "This city is known for the Eiffel Tower",
        options: [
          { id: "a1", text: "Paris", isCorrect: true },
          { id: "a2", text: "London", isCorrect: false },
          { id: "a3", text: "Berlin", isCorrect: false },
          { id: "a4", text: "Madrid", isCorrect: false },
        ],
      },
      {
        id: "q2",
        text: "Which programming language was created by Brendan Eich?",
        imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
        hint: "This language is commonly used for web development",
        options: [
          { id: "b1", text: "Python", isCorrect: false },
          { id: "b2", text: "JavaScript", isCorrect: true },
          { id: "b3", text: "Java", isCorrect: false },
          { id: "b4", text: "PHP", isCorrect: false },
        ],
      },
      {
        id: "q3",
        text: "What is the largest planet in our solar system?",
        imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
        hint: "This gas giant has a prominent Great Red Spot",
        options: [
          { id: "c1", text: "Mars", isCorrect: false },
          { id: "c2", text: "Saturn", isCorrect: false },
          { id: "c3", text: "Jupiter", isCorrect: true },
          { id: "c4", text: "Neptune", isCorrect: false },
        ],
      }
    ],
  };

  const currentQuestion = quiz.questions[progress.currentQuestionIndex];
  const isLastQuestion =
    progress.currentQuestionIndex === quiz.questions.length - 1;


  const onAnswer = (answer) => {
    console.log("Answer submitted:", answer);
    setProgress({
      ...progress,
      answers: [...progress.answers, answer],
    });
  };

  const onUseHint = () => {
    setProgress({
      ...progress,
      hintsRemaining: progress.hintsRemaining - 1,
    });
  };

  const onNext = () => {
    if (!isLastQuestion) {
      setProgress({
        ...progress,
        currentQuestionIndex: progress.currentQuestionIndex + 1,
      });
      setIsAnswered(false);  // Reset the answered state when moving to the next question
    } else {
      // Handle quiz completion
      window.alert("Quiz completed!");
    }
  };

  return (
    <div className="h-screen overflow-y-auto">
      <MCQQuestion
        question={currentQuestion}
        onAnswer={onAnswer}
        onUseHint={onUseHint}
        hintsAvailable={progress.hintsRemaining > 0}
        setIsAnswered={setIsAnswered}  // Pass the setIsAnswered function
      />
      <BottomBar
        userName={USER_DATA.name}
        avatarUrl={USER_DATA.avatarUrl}
        onNextQuestion={isAnswered ? onNext : undefined}
        isAnswered={isAnswered}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
}