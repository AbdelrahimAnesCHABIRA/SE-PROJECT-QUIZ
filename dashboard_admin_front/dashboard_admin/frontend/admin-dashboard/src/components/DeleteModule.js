import React, { useState, useEffect } from "react"; // Importing React hooks
import "../styles/DeleteModule.css";
import { deleteModuleByNameAndLevel } from "../api";

const DeleteModule = ({ onClose }) => {
  const [moduleName, setModuleName] = useState(""); // State for module name
  const [studyLevel, setStudyLevel] = useState(""); // State for study level

  const handleDelete = async (moduleName, studyLevel) => {
    try {
        console.log("Deleting module with name and level:", moduleName, studyLevel);
        const response = await deleteModuleByNameAndLevel(moduleName, studyLevel);
        alert("Module deleted successfully: " + JSON.stringify(response.module));
       // fetchModules(); // Refresh the module list after deletion
    } catch (error) {
        console.error("Error deleting module:", error.response?.data || error.message);
        alert("Failed to delete module: " + (error.response?.data || error.message));
    }
};


  return (
    <div className="delete-module-container">
      <div className="delete-module-form">
        <h2>حذف الوحدة</h2>
        <label>
          اسم الوحدة:
          <input
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            placeholder="أدخل اسم الوحدة"
          />
        </label>
        <label>
          مستوى الدراسة:
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
        </label>
        <div className="buttons">
        <button onClick={() => handleDelete(moduleName, studyLevel)}>Delete</button>

          <button className="cancel-btn" onClick={onClose}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModule;
