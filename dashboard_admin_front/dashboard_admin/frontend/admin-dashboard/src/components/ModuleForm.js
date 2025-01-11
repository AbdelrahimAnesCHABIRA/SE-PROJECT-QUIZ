import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateQuiz.css";

const ModuleForm = () => {
  const [moduleName, setModuleName] = useState("");
  const [studyLevel, setStudyLevel] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!moduleName || !studyLevel) {
      alert("يرجى إدخال اسم الوحدة واختيار المستوى الدراسي.");
      return;
    }

    const moduleData = { moduleName, studyLevel };

    try {
      const response = await axios.post("http://localhost:5001/api/modules", moduleData);
      console.log("Module added successfully:", response.data);
      alert("تمت إضافة الوحدة بنجاح!");

      // Reset the form
      setModuleName("");
      setStudyLevel("");
    } catch (error) {
      console.error("Error adding module:", error.response?.data || error.message);
      alert("حدث خطأ أثناء إضافة الوحدة.");
    }
  };

  return (
    <div className="create-quiz-container">
      <h1>إضافة وحدة جديدة</h1>
      <form className="create-quiz-form" onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>اسم الوحدة</label>
          <input
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>المستوى الدراسي</label>
          <select
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            required
          >
            <option value="">اختر المستوى الدراسي</option>
            <option value="الاولى إبتدائي">الاولى إبتدائي</option>
            <option value="الثانية إبتدائي">الثانية إبتدائي</option>
            <option value="الثالثة إبتدائي">الثالثة إبتدائي</option>
            <option value="الرابعة إبتدائي">الرابعة إبتدائي</option>
            <option value="الخامسة إبتدائي">الخامسة إبتدائي</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          إضافة الوحدة
        </button>
      </form>
    </div>
  );
};

export default ModuleForm;
