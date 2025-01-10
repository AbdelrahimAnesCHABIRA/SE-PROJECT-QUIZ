import React, { useState } from "react";
import "../styles/DeleteQuiz.css";

function DeleteQuiz({ onSubmit }) {
  const [moduleName, setModuleName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [studyLevel, setStudyLevel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (moduleName && chapterName && studyLevel) {
      onSubmit(moduleName, chapterName, studyLevel);
    } else {
      alert("يرجى إدخال اسم الوحدة، اسم الفصل، واختيار مستوى الدراسة.");
    }
  };

  return (
    <div className="delete-quiz-container">
      <h1>حذف الأسئلة</h1>
      <form className="delete-quiz-form" onSubmit={handleSubmit}>
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
            required
          >
            <option value="">--اختر مستوى الدراسة--</option>
            <option value="Primary">ابتدائي</option>
            <option value="Secondary">إعدادي</option>
            <option value="Highschool">ثانوي</option>
            <option value="University">جامعي</option>
            <option value="Other">أخرى</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          عرض الأسئلة
        </button>
      </form>
    </div>
  );
}

export default DeleteQuiz;
