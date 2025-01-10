const express = require("express");
const router = express.Router();
const Module = require("../models/module_model"); // Import the Module model
const Chapter = require("../models/chapter_model"); // Import the Chapter model (used for chapter-related routes)
const question_model = require("../models/question_model"); // Import the Question
// Import controllers
const {
    getModules,
    createModule,
    updateModule,
    
    getModuleById,
} = require("../controllers/module_controller");

const {
    createChapter,
    updateChapter,
    deleteChapter,
    getChapterIdByName,
    
} = require("../controllers/chapter_controller");

const {
    getQuizzes,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizById,
} = require("../controllers/quiz_controller");

const {
    getQuestionsByModuleAndChapterName,
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionById,
    getQuestionsByModuleAndChapter,
} = require("../controllers/question_controller");

// Quiz Routes
router.route("/quizzes")
    .get(getQuizzes)
    .post(createQuiz);
router.route("/quizzes/:id")
    .get(getQuizById)
    .put(updateQuiz)
    .delete(deleteQuiz);

// Module Routes
// Get a module by name
router.get("/modules", async (req, res) => {
    const { name } = req.query;
    try {
        const module = await Module.findOne({ moduleName: name });
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.json(module);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a module
router.post("/modules", async (req, res) => {
    const { moduleName, studyLevel } = req.body;

    // Validate input
    if (!moduleName || !studyLevel) {
        return res.status(400).json({ message: "Module name and study level are required." });
    }

    try {
        // Check if the module already exists
        const existingModule = await Module.findOne({ moduleName });
        if (existingModule) {
            return res.status(400).json({ message: "Module already exists." });
        }

        // Create and save the new module
        const newModule = new Module({ moduleName, studyLevel, chapters: [] });
        await newModule.save();
        res.status(201).json(newModule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const { deleteModuleByNameAndLevel } = require("../controllers/module_controller");
/**
router.delete("/modules", async (req, res) => {
    console.log("Received DELETE request for /modules");
    console.log("Request body:", req.body);

    const { moduleName, studyLevel } = req.body;

    if (!moduleName || !studyLevel) {
        console.log("Invalid request body.");
        return res.status(400).json({ message: "Module name and study level are required." });
    }

    try {
        const deletedModule = await Module.findOneAndDelete({ moduleName, studyLevel });
        if (!deletedModule) {
            console.log("Module not found.");
            return res.status(404).json({ message: "Module not found." });
        }

        console.log("Module deleted:", deletedModule);
        res.status(200).json({
            message: "Module deleted successfully.",
            module: deletedModule,
        });
    } catch (error) {
        console.error("Error deleting module:", error.message);
        res.status(500).json({ message: error.message });
    }
});
**/
  router.route("/modules")
  router.route("/modules").delete((req, res) => {
    console.log("DELETE /modules called");
    deleteModuleByNameAndLevel(req, res);
});

router.route("/modules/:id")
    .get(getModuleById)
    .put(updateModule)
    ;

// Chapter Routes
// Get a chapter by name and moduleId
/*
router.get("/chapters", async (req, res) => {
    const { name, moduleId } = req.query;
    if (!moduleId || !name) {
        return res.status(400).json({ message: "Module ID and chapter name are required." });
    }

    try {
        const chapter = await Chapter.findOne({ chapterName: name, moduleId });
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found." });
        }
        res.json(chapter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/chapters", async (req, res) => {
    const { name, moduleId } = req.query;

    if (!name || !moduleId) {
        return res.status(400).json({ message: "Module ID and chapter name are required." });
    }

    try {
        const chapter = await Chapter.findOne({ chapterName: name, moduleId });
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found." });
        }
        res.json(chapter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/

router.route("/chapters")
    .post(createChapter);
router.route("/chapters/:id").put(updateChapter).delete(deleteChapter);
router.get("/chapter-id", getChapterIdByName);

// Question Routes
router.route("/questions")
    .post(createQuestion)
    .get(getQuestionsByModuleAndChapterName); // Fetch questions by moduleName, chapterName, and studyLevel

router.route("/questions/:id")
    .get(getQuestionById) // Get a specific question by ID
    .put(updateQuestion) // Update a specific question
    .delete(deleteQuestion); // Delete a specific question

router.route("/modules/:moduleId/chapters/:chapterId/questions")
    .get(getQuestionsByModuleAndChapter); // Fetch questions by moduleId and chapterId

router.route("/chapters/:chapterId/questions")
    .get(getQuestions); // Fetch all questions for a specific chapter

module.exports = router;
