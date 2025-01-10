import React, { useState } from "react";
import "../styles/CreateQuiz.css"; // Reuse the same styles as CreateQuiz

function EditQuestion({ onSubmit, questionData }) {
  const [selectedModule, setSelectedModule] = useState(questionData?.module || "");
  const [selectedChapter, setSelectedChapter] = useState(questionData?.chapter || "");
  const [questionText, setQuestionText] = useState(questionData?.questionText || "");
  const [correctAnswer, setCorrectAnswer] = useState(questionData?.correctAnswer || "");
  const [falseOptions, setFalseOptions] = useState(questionData?.falseOptions || ["", "", ""]);
  const [explanation, setExplanation] = useState(questionData?.explanation || "");

  const modules = ["الرياضيات", "العلوم", "التاريخ", "الفن", "البرمجة"];
  const chapters = ["الفصل الأول", "الفصل الثاني", "الفصل الثالث", "الفصل الرابع", "الفصل الخامس"];

  const handleFalseOptionChange = (index, value) => {
    const updatedFalseOptions = [...falseOptions];
    updatedFalseOptions[index] = value;
    setFalseOptions(updatedFalseOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedModule && selectedChapter && questionText && correctAnswer && falseOptions.every(Boolean)) {
      onSubmit({
        module: selectedModule,
        chapter: selectedChapter,
        questionText,
        correctAnswer,
        falseOptions,
        explanation,
      });
    } else {
      alert("يرجى ملء جميع الحقول.");
    }
  };

  return (
    <div className="create-quiz-container">
      <h1>تعديل الأسئلة</h1>
      <form className="create-quiz-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="module">اختر الوحدة:</label>
          <select
            id="module"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            required
          >
            <option value="">-- اختر الوحدة --</option>
            {modules.map((module, index) => (
              <option key={index} value={module}>
                {module}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="chapter">اختر الفصل:</label>
          <select
            id="chapter"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            required
            disabled={!selectedModule}
          >
            <option value="">-- اختر الفصل --</option>
            {chapters.map((chapter, index) => (
              <option key={index} value={chapter}>
                {chapter}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>نص السؤال</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="أدخل نص السؤال هنا"
            required
          />
        </div>

        <div className="form-group">
          <label>الإجابة الصحيحة</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="أدخل الإجابة الصحيحة"
            required
          />
        </div>

        <div className="form-group">
          <label>الإجابات الخاطئة</label>
          {falseOptions.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleFalseOptionChange(index, e.target.value)}
                placeholder={`الإجابة الخاطئة ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>التفسير (اختياري)</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="أدخل التفسير هنا إذا لزم الأمر"
          />
        </div>

        <button type="submit" className="submit-btn">
          تعديل
        </button>
      </form>
    </div>
  );
}

export default EditQuestion;
