import React, { useState, useEffect } from "react";
import "../styles/CreateQuiz.css";
import "../styles/CreateQuestion.css";
import axios from "axios";
import { getChapterId } from "../api";
function CreateQuiz() {
  const [moduleName, setModuleName] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [step, setStep] = useState(1); // Step 1 for module and chapter input, Step 2 for question creation

  // Step 2 data
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [hint, setHint] = useState("");

  // Handle options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleNext = async () => {
    try {
        const chapterId = await getChapterId(moduleName, chapterName);
        if (!chapterId) {
            alert("Chapter not found.");
            return;
        }

        setSelectedChapterId(chapterId);
        setStep(2); // Move to question creation step
    } catch (error) {
        console.error("Error fetching chapter ID:", error);
        alert("Error fetching chapter ID.");
    }
};


  // Handle question submission
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    const questionData = {
      chapterId: selectedChapterId,
      questionText,
      correctAnswer: answerText,
      falseOptions: options,
      explanation: hint,
    };

    try {
      const response = await axios.post("http://localhost:5001/api/questions", questionData);
      console.log("Question added successfully:", response.data);

      // Reset form after submission
      setQuestionText("");
      setAnswerText("");
      setOptions(["", "", ""]);
      setHint("");
    } catch (error) {
      console.error("Error adding question:", error.response?.data || error.message);
    }
  };

  return (
    <div className="create-quiz-container">
      {step === 1 && (
        <div className="module-selection">
          <h1>إدخال الوحدة والفصل</h1>
          <div className="form-group">
            <label>اسم الوحدة:</label>
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="أدخل اسم الوحدة"
              required
            />
          </div>
          <div className="form-group">
            <label>اسم الفصل:</label>
            <input
              type="text"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              placeholder="أدخل اسم الفصل"
              required
            />
          </div>
          <button className="submit-btn" onClick={handleNext}>
            التالي
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="create-question-container">
          <h1>إنشاء سؤال</h1>
          <p>
            الوحدة: <strong>{moduleName}</strong> | الفصل: <strong>{chapterName}</strong>
          </p>
          <form className="create-question-form" onSubmit={handleSubmitQuestion}>
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
              <label>خيارات (3 خاطئة):</label>
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
              <label htmlFor="hint">تلميح (اختياري):</label>
              <input
                type="text"
                id="hint"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              إضافة سؤال
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateQuiz;
