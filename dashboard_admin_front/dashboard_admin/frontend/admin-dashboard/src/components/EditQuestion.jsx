import React, { useState } from "react";
import "../styles/QuestionsPage.css"; // Reuse styles
import { getQuestionsByModuleAndChapter, updateQuestion } from "../api";

function EditQuestion() {
  const [moduleName, setModuleName] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await getQuestionsByModuleAndChapter(
        moduleName,
        chapterName,
        studyLevel
      );

      if (!fetchedQuestions.length) {
        alert("لا توجد أسئلة متوفرة لهذا الفصل.");
      }

      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error.response?.data || error.message);
      alert("حدث خطأ أثناء استرجاع الأسئلة. تأكد من صحة بيانات الوحدة والفصل.");
    }
  };

  // Handle question modification submission
  const handleModifySubmit = async (e) => {
    e.preventDefault();

    try {
      await updateQuestion(selectedQuestion._id, selectedQuestion);
      alert("تم تعديل السؤال بنجاح.");
      setSelectedQuestion(null); // Return to the question list view
      fetchQuestions(); // Refresh the list of questions
    } catch (error) {
      console.error("Error updating question:", error.message);
      alert("حدث خطأ أثناء تعديل السؤال.");
    }
  };

  // Handle field changes in the modification form
  const handleFieldChange = (field, value) => {
    setSelectedQuestion({ ...selectedQuestion, [field]: value });
  };

  return (
    <div className="questions-page-container">
      {!selectedQuestion ? (
        // Display the form for selecting module, chapter, and study level
        <>
          <h1>تعديل الأسئلة حسب الوحدة والفصل</h1>
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
          <div className="form-group">
            <label>مستوى الدراسة:</label>
            <select
              value={studyLevel}
              onChange={(e) => setStudyLevel(e.target.value)}
            >
              <option value="">اختر المستوى الدراسي</option>
              <option value="الاولى إبتدائي">الاولى إبتدائي</option>
              <option value="الثانية إبتدائي">الثانية إبتدائي</option>
              <option value="الثالثة إبتدائي">الثالثة إبتدائي</option>
              <option value="الرابعة إبتدائي">الرابعة إبتدائي</option>
              <option value="الخامسة إبتدائي">الخامسة إبتدائي</option>
            </select>
          </div>
          <button className="fetch-questions-btn" onClick={fetchQuestions}>
            عرض الأسئلة
          </button>

          {questions.length > 0 ? (
            <div className="questions-list">
              {questions.map((question) => (
                <div key={question._id} className="question-item">
                  <span>{question.questionText}</span>
                  <button
                    className="modify-btn"
                    onClick={() => setSelectedQuestion(question)}
                  >
                    تعديل
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>لا توجد أسئلة متوفرة.</p>
          )}
        </>
      ) : (
        // Display the form for modifying the selected question
        <div className="create-question-container">
          <h1>تعديل السؤال</h1>
          <form className="create-question-form" onSubmit={handleModifySubmit}>
            <div className="form-group">
              <label htmlFor="questionText">نص السؤال:</label>
              <textarea
                id="questionText"
                value={selectedQuestion.questionText}
                onChange={(e) => handleFieldChange("questionText", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="answerText">الإجابة الصحيحة:</label>
              <input
                type="text"
                id="answerText"
                value={selectedQuestion.correctAnswer}
                onChange={(e) => handleFieldChange("correctAnswer", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>الخيارات (ثلاثة خيارات خاطئة):</label>
              {selectedQuestion.falseOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleFieldChange("falseOptions", [
                      ...selectedQuestion.falseOptions.slice(0, index),
                      e.target.value,
                      ...selectedQuestion.falseOptions.slice(index + 1),
                    ])
                  }
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
                value={selectedQuestion.hint || ""}
                onChange={(e) => handleFieldChange("hint", e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              تعديل
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setSelectedQuestion(null)}
            >
              إلغاء
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditQuestion;
