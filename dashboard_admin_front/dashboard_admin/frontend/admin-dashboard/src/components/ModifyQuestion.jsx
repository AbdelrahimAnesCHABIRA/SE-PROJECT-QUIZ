import React, { useState } from "react";
import "../styles/CreateQuestion.css"; // Reuse the same styles as CreateQuestion

function ModifyQuestion({ question, onSubmit }) {
  const [questionText, setQuestionText] = useState(question?.name || "");
  const [answerText, setAnswerText] = useState(question?.answer || "");
  const [options, setOptions] = useState(question?.options || ["", "", ""]);
  const [hint, setHint] = useState(question?.hint || "");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      questionText,
      answerText,
      options,
      hint,
    });
    alert("تم تعديل السؤال بنجاح");
  };

  return (
    <div className="create-question-container">
      <h1>تعديل السؤال</h1>
      <form className="create-question-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="questionText">نص السؤال:</label>
          <textarea
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="answerText">الإجابة الصحيحة:</label>
          <input
            type="text"
            id="answerText"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>الخيارات (ثلاثة خيارات خاطئة):</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`الخيار ${index + 1}`}
              required
            />
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="hint">التلميح (اختياري):</label>
          <input
            type="text"
            id="hint"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">
          تعديل
        </button>
      </form>
    </div>
  );
}

export default ModifyQuestion;
