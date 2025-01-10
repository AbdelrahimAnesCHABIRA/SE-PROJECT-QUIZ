import React, { useState } from "react";
import "../styles/EditModule.css";

const EditModule = ({ onSubmit, onCancel }) => {
  const [moduleName, setModuleName] = useState("");
  const [studyLevel, setStudyLevel] = useState("");

  const handleEdit = () => {
    console.log("Editing module:", moduleName, "Level:", studyLevel);
    onSubmit({ moduleName, studyLevel });
  };

  return (
    <div className="edit-module-container">
      <div className="edit-module-form">
        <h2>تعديل الوحدة</h2>
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
          <label>مستوى الدراسة:</label>
          <select
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            required
          >
            <option value="" disabled>
              اختر المستوى
            </option>
            <option value="Primary">ابتدائي</option>
            <option value="Secondary">إعدادي</option>
            <option value="Highschool">ثانوي</option>
            <option value="University">جامعي</option>
          </select>
        </div>
        <div className="button-group">
          <button className="submit-btn" onClick={handleEdit}>
            تعديل
          </button>
          <button className="stop-btn" onClick={onCancel}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModule;
