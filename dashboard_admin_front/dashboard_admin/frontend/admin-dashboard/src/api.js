import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api"; // Backend base URL

// Modules
export const getModules = async () => {
    const response = await axios.get(`${API_BASE_URL}/modules`);
    return response.data;
};

export const createModule = async (moduleData) => {
    const response = await axios.post(`${API_BASE_URL}/modules`, moduleData);
    return response.data;
};

export const updateModule = async (id, moduleData) => {
    const response = await axios.put(`${API_BASE_URL}/modules/${id}`, moduleData);
    return response.data;
};
export const deleteModuleByNameAndLevel = async (moduleName, studyLevel) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/modules`, {
            data: { moduleName, studyLevel },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting module:", error.response?.data || error.message);
        throw error;
    }
};



// Chapters
export const getChapterId = async (moduleName, chapterName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/chapter-id`, {
            params: { moduleName, chapterName },
        });
        return response.data.chapterId;
    } catch (error) {
        console.error("Error fetching chapter ID:", error.response?.data || error.message);
        throw error; // Re-throw the error to handle it in the caller
    }
};

export const createChapter = async (chapterData) => {
    const response = await axios.post(`${API_BASE_URL}/chapters`, chapterData);
    return response.data;
};

export const updateChapter = async (id, chapterData) => {
    const response = await axios.put(`${API_BASE_URL}/chapters/${id}`, chapterData);
    return response.data;
};

export const deleteChapter = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/chapters/${id}`);
    return response.data;
};

export const getQuestionsByModuleAndChapter = async (moduleName, chapterName, studyLevel) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/questions`, {
            params: { moduleName, chapterName, studyLevel },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching questions by module, chapter, and study level:",
            error.response?.data || error.message
        );
        throw error;
    }
};

  
  export const deleteQuestion = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/questions/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting question:", error.message);
      throw error;
    }
  };
  
  
// Questions
export const getQuestions = async (chapterId) => {
    const response = await axios.get(`${API_BASE_URL}/chapters/${chapterId}/questions`);
    return response.data;
};

export const createQuestion = async (questionData) => {
    const response = await axios.post(`${API_BASE_URL}/questions`, questionData);
    return response.data;
};

export const updateQuestion = async (id, questionData) => {
    const response = await axios.put(`${API_BASE_URL}/questions/${id}`, questionData);
    return response.data;
};



