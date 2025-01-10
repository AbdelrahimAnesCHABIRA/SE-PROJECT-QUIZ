// src/components/Dashboard.js
import React, { useState } from "react";
import Card from "./Card";
import CreateQuiz from "./CreateQuiz";
import CreateQuestion from "./CreateQuestion";
import DeleteQuiz from "./DeleteQuiz";
import QuestionsPage from "./QuestionsPage";
import ModifyQuestion from "./ModifyQuestion";
import EditQuestion from "./EditQuestion";
import DeleteModule from "./DeleteModule";
import EditModule from "./EditModule"; // Import EditModule
import ModifyModule from "./ModifyModule"; // Import ModifyModule
import ModuleForm from "./ModuleForm"; // Import ModuleForm
import "../styles/Dashboard.css";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";


const Dashboard = () => {
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);
  const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);
  const [showModifyQuestion, setShowModifyQuestion] = useState(false);
  const [showQuestionsPage, setShowQuestionsPage] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [showAddModuleForm, setShowAddModuleForm] = useState(false);
  const [showEditModule, setShowEditModule] = useState(false); // New state for editing module
  const [showModifyModule, setShowModifyModule] = useState(false); // New state for modifying module

  const [showDeleteModule, setShowDeleteModule] = useState(false);

  const handleDeleteModuleClick = () => {
    setShowDeleteModule(true);
  };

  const handleCloseDeleteModule = () => {
    setShowDeleteModule(false);
  };

  const [modules, setModules] = useState([]); // To store modules and chapters
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const data = [
    { title: "إجمالي المستخدمين", value: 31, icon: "fa-user" },
    { title: "إجمالي الأسئلة", value: 15, icon: "fa-question-circle" },
    { title: "إجمالي الفئات", value: 5, icon: "fa-folder" },
    { title: "إجمالي الإختبارات", value: 3, icon: "fa-star" },
    { title: "إجمالي الإشعارات", value: 92, icon: "fa-bell" },
  ];

  const handleAddQuestionClick = () => {
    setShowCreateQuiz(false);
    setShowCreateQuestion(true);
    setShowDeleteQuiz(false);
    setShowModifyQuestion(false);
    setShowEditQuestion(false);
    setShowEditModule(false);
    setShowModifyModule(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteQuiz(false);
    setShowCreateQuiz(false);
    setShowCreateQuestion(false);
    setShowModifyQuestion(false);
    setShowEditQuestion(false);
    setShowEditModule(false);
    setShowModifyModule(false);
    setShowQuestionsPage(true);
  };

  const handleEditQuestionSubmit = async (questionData) => {
    try {
      const response = await fetch(`/api/questions/${selectedQuestion?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });
  
      if (response.ok) {
        alert("تم تحديث السؤال بنجاح");
        // Update your state or perform any other necessary actions here
        setShowEditQuestion(false); // Close the EditQuestion component
      } else {
        const error = await response.json();
        alert(`حدث خطأ: ${error.message}`);
      }
    } catch (err) {
      alert("فشل الاتصال بالخادم");
    }
  };
  


  const handleEditClick = (question) => {
    setSelectedQuestion(question); // Set the selected question
  };

  const handleFormSubmit = (updatedQuestion) => {
    console.log("Updated Question: ", updatedQuestion);
    // Perform any updates here (e.g., API call, state update)
    setSelectedQuestion(null); // Reset form after submission
  };
  

  const handleEditModuleClick = () => {
    setShowModifyModule(true); // Show the ModifyModule container
    setShowEditModule(false);
  };

  const handleEditModuleSubmit = (editedModule) => {
    setModules((prevModules) =>
      prevModules.map((mod) => (mod.id === editedModule.id ? editedModule : mod))
    );
    setShowEditModule(false);
  };

  const handleModifyModuleSubmit = (updatedModules) => {
    setModules(updatedModules);
    setShowModifyModule(false);
  };

  const handleEditSubmit = ({ selectedModule, selectedChapter }) => {
    setSelectedModule(selectedModule);
    setSelectedChapter(selectedChapter);
    setShowEditQuestion(false);
    setShowModifyQuestion(true);
    setSelectedQuestion({
      name: "مثال على السؤال",
      answer: "الإجابة الصحيحة",
      options: ["خيار 1", "خيار 2", "خيار 3"],
      hint: "تلميح اختياري",
    });
  };

  const handleModifySubmit = (modifiedQuestion) => {
    console.log("Modified question:", modifiedQuestion);
    alert("تم تعديل السؤال بنجاح");
    setShowModifyQuestion(false);
  };

  const handleQuizSubmit = (module, chapter) => {
    setSelectedModule(module);
    setSelectedChapter(chapter);
    setShowCreateQuiz(false);
    setShowCreateQuestion(true);
  };

  const handleDeleteSubmit = (module, chapter) => {
    setSelectedModule(module);
    setSelectedChapter(chapter);
    setShowDeleteQuiz(false);
    setShowQuestionsPage(true);
  };


  const handleAddModuleClick = () => {
    setShowAddModuleForm(true);
  };

  const handleAddModuleSubmit = (module) => {
    setModules((prevModules) => [...prevModules, module]);
    setShowAddModuleForm(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">لوحة الإدارة</h1>
        <hr className="title-divider" />
      </div>

      {/* Cards Section */}
      <div className="dashboard-cards">
        {data.map((item, index) => (
          <Card key={index} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </div>

      {/* List Section */}
      <div className="dashboard-options">
        <h2 className="options-title">إدارة الأسئلة والوحدات</h2>

        {/* Questions Row */}
        <div className="row">
          <div className="row-title">الأسئلة</div>
          <div className="row-actions">
            <Fab variant="extended" className="action-btn add" onClick={handleAddQuestionClick}>
              <AddIcon sx={{ mr: 1 }} />
              إضافة
            </Fab>

            <Fab variant="extended" className="action-btn edit" onClick={handleEditClick}>
        <EditIcon sx={{ mr: 1 }} />
        تعديل
      </Fab>

      {selectedQuestion && (
        <div className="edit-form-container">
          <EditQuestion
            questionData={selectedQuestion}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

            <Fab variant="extended" className="action-btn delete" onClick={handleDeleteClick}>
              <DeleteIcon sx={{ mr: 1 }} />
              حذف
            </Fab>
          </div>
        </div>

        {/* Modules Row */}
        <div className="row">
          <div className="row-title">الوحدات</div>
          <div className="row-actions">
            <Fab variant="extended" className="action-btn add" onClick={handleAddModuleClick}>
              <AddIcon sx={{ mr: 1 }} />
              إضافة
            </Fab>
            <Fab variant="extended" className="action-btn edit" onClick={handleEditModuleClick}>
              <EditIcon sx={{ mr: 1 }} />
              تعديل
            </Fab>
            <Fab variant="extended" className="action-btn delete" onClick={handleDeleteModuleClick}>
              <DeleteIcon sx={{ mr: 1 }} />
              حذف
            </Fab>
          </div>
        </div>

        {/* Predefined Quizzes Row */}
        <div className="row">
          <div className="row-title">الإختبارات المسبقة</div>
          <div className="row-actions">
            <Fab variant="extended" className="action-btn add">
              <AddIcon sx={{ mr: 1 }} />
              إضافة
            </Fab>
            <Fab variant="extended" className="action-btn edit">
              <EditIcon sx={{ mr: 1 }} />
              تعديل
            </Fab>
            <Fab variant="extended" className="action-btn delete">
              <DeleteIcon sx={{ mr: 1 }} />
              حذف
            </Fab>
          </div>
        </div>
      </div>

      {/* Render Components */}
      {showCreateQuiz && <CreateQuiz onSubmit={handleQuizSubmit} />}
      {showCreateQuestion && (
        <CreateQuestion selectedModule={selectedModule} selectedChapter={selectedChapter} />
      )}
      {showDeleteQuiz && <DeleteQuiz onSubmit={handleDeleteSubmit} />}
      {showQuestionsPage && (
        <QuestionsPage
          selectedModule={selectedModule}
          selectedChapter={selectedChapter}
        />
      )}
      {showEditQuestion && <EditQuestion onSubmit={handleEditSubmit} />}
      {showModifyQuestion && (
        <ModifyQuestion question={selectedQuestion} onSubmit={handleModifySubmit} />
      )}
      {showAddModuleForm && <ModuleForm onSubmit={handleAddModuleSubmit} />}
      {showEditModule && (
        <EditModule
          moduleData={modules.find((module) => module.id === selectedModule)}
          onSubmit={handleEditModuleSubmit}
          onCancel={() => setShowEditModule(false)}
        />
      )}
      {showModifyModule && (
        <ModifyModule
          modules={modules}
          onSubmit={handleModifyModuleSubmit}
        />
      )}
      {showDeleteModule && (
        <div className="module-list-container">
          <DeleteModule onClose={handleCloseDeleteModule} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
