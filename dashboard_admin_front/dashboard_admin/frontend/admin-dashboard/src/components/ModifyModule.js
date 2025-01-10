import React, { useState } from "react";
import axios from "axios";
import "../styles/EditModule.css";

const EditAndModifyModule = ({ onCancel }) => {
  const [step, setStep] = useState(1); // Step 1: Search, Step 2: Modify
  const [moduleName, setModuleName] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [moduleData, setModuleData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [newModuleName, setNewModuleName] = useState("");
  const [newStudyLevel, setNewStudyLevel] = useState("");

  const studyLevels = ["Primary", "Secondary", "Highschool", "University"];

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/modules?name=${moduleName}&level=${studyLevel}`
      );
      const module = response.data;
      setModuleData(module);
      setNewModuleName(module.moduleName);
      setNewStudyLevel(module.studyLevel);
      setChapters(module.chapters || []);
      setStep(2);
    } catch (error) {
      console.error("Error fetching module:", error);
      alert("Module not found or an error occurred.");
    }
  };

  const handleChapterChange = (index, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index] = value;
    setChapters(updatedChapters);
  };

  const addChapter = () => {
    setChapters([...chapters, ""]);
  };

  const deleteChapter = (index) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    setChapters(updatedChapters);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedModule = {
        moduleName: newModuleName,
        studyLevel: newStudyLevel,
        chapters,
      };

      await axios.put(`http://localhost:5001/api/modules/${moduleData._id}`, updatedModule);

      alert("Module updated successfully.");
      setStep(1); // Reset to the search step
      setModuleData(null);
      setModuleName("");
      setStudyLevel("");
    } catch (error) {
      console.error("Error updating module:", error);
      alert("An error occurred while updating the module.");
    }
  };

  const handleCancel = () => {
    setStep(1); // Return to the search step
    setModuleData(null);
    setModuleName("");
    setStudyLevel("");
  };

  return (
    <div className="edit-module-container">
      {step === 1 && (
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
              {studyLevels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="button-group">
            <button className="submit-btn" onClick={handleSearch}>
              بحث
            </button>
            <button className="stop-btn" onClick={handleCancel}>
              إلغاء
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="create-quiz-container">
          <h1>تعديل الوحدة</h1>
          <form className="create-quiz-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>اسم الوحدة</label>
              <input
                type="text"
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>المستوى الدراسي</label>
              <select
                value={newStudyLevel}
                onChange={(e) => setNewStudyLevel(e.target.value)}
                required
              >
                <option value="" disabled>
                  اختر المستوى الدراسي
                </option>
                {studyLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>الفصول</label>
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <input
                    type="text"
                    value={chapter}
                    onChange={(e) => handleChapterChange(index, e.target.value)}
                    placeholder={`الفصل ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => deleteChapter(index)}
                    className="delete-btn"
                  >
                    حذف
                  </button>
                </div>
              ))}
              <button type="button" onClick={addChapter} className="add-btn">
                إضافة
              </button>
            </div>

            <div className="button-group">
              <button type="submit" className="submit-btn">
                حفظ التعديلات
              </button>
              <button type="button" onClick={handleCancel} className="stop-btn">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditAndModifyModule;
