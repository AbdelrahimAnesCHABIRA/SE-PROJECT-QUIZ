const Question = require("../models/question_model");
const Module = require("../models/module_model");
const Chapter = require("../models/chapter_model");

const getQuestionsByModuleAndChapterName = async (req, res) => {
    const { moduleName, chapterName, studyLevel } = req.query;

    try {
        // Validate input
        if (!moduleName || !chapterName || !studyLevel) {
            return res.status(400).json({ message: "Module name, chapter name, and study level are required." });
        }

        // Find the module
        const module = await Module.findOne({ moduleName, studyLevel });
        if (!module) {
            return res.status(404).json({ message: "Module not found." });
        }

        // Find the chapter
        const chapter = await Chapter.findOne({ chapterName, moduleId: module._id });
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found in the specified module." });
        }

        // Fetch questions
        const questions = await Question.find({ chapterId: chapter._id });
        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found." });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error.message);
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
};

// Get all questions for a chapter
const getQuestions = async (req, res) => {
    try {
        const { chapterId } = req.params;
        const questions = await Question.find({ chapterId });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestionsByModuleAndChapter = async (req, res) => {
    try {
      const { moduleId, chapterId } = req.params;
      const questions = await Question.find({ module: moduleId, chapter: chapterId }); 
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions" });
    }
  };
// Create a new question
const createQuestion = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the incoming request
        const { chapterId, questionText, correctAnswer, falseOptions, explanation } = req.body;

        const newQuestion = new Question({
            chapterId,
            questionText,
            correctAnswer,
            falseOptions,
            explanation,
        });
        const savedQuestion = await newQuestion.save();
        console.log("Saved Question:", savedQuestion); // Log the saved question
        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error("Error:", error.message); // Log the error
        res.status(400).json({ message: error.message });
    }
};


// Update an existing question
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a question
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionById,
    getQuestionsByModuleAndChapter,
    getQuestionsByModuleAndChapterName,
};
