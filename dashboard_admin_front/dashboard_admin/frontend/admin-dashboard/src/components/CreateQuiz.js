import React, { useState } from "react";
import "../styles/CreateQuiz.css";

function CreateQuiz({ onSubmit }) {
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  const modules = ["رياضيات", "علوم", "تاريخ", "فنون", "برمجة"];
  const chapters = ["الفصل 1", "الفصل 2", "الفصل 3", "الفصل 4", "الفصل 5"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedModule && selectedChapter) {
      onSubmit(selectedModule, selectedChapter);
    } else {
      alert("يرجى اختيار الوحدة والفصل.");
    }
  };

  return (
    <div className="create-quiz-container">
      <h1>إنشاء اختبار</h1>
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

        <button type="submit" className="submit-btn">
          إنشاء اختبار
        </button>
      </form>
    </div>
  );
}

export default CreateQuiz;
