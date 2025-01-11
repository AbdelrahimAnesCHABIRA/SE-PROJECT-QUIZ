import React from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = ({ questions }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
<h2 className="text-lg font-bold mb-4">تفاصيل السؤال</h2>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question.text}
            score={question.score}
            time={question.time}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionList;