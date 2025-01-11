import React, { useState } from "react";
import "../styles/QuestionsPage.css";
import { getQuestionsByModuleAndChapter, deleteQuestion } from "../api";

function QuestionsPage() {
  const [moduleName, setModuleName] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [questions, setQuestions] = useState([]);

  // Fetch questions
  const fetchQuestions = async () => {
    console.log("Fetching questions for:", { moduleName, chapterName, studyLevel });

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


  // Delete a question
  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((q) => q._id !== id));
      alert("تم حذف السؤال بنجاح.");
    } catch (error) {
      console.error("Error deleting question:", error.message);
      alert("حدث خطأ أثناء حذف السؤال.");
    }
  };

  return (
    <div className="questions-page-container">
      <h1>حذف الأسئلة حسب الوحدة والفصل</h1>
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
                className="delete-btn"
                onClick={() => handleDeleteQuestion(question._id)}
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>لا توجد أسئلة متوفرة.</p>
      )}
    </div>
  );
}

export default QuestionsPage;
