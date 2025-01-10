const Chapter = require("../models/chapter_model");
const Module = require("../models/module_model");
const createChapter = async (req, res) => {
    try {
        const { chapterName } = req.body;
        if (!chapterName) {
            return res.status(400).send({ error: "Chapter name is required" });
        }
        const chapter = new Chapter({ chapterName });
        await chapter.save();
        res.status(201).send(chapter);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter) {
            return res.status(404).send({ error: "Chapter not found" });
        }

        const { chapterName } = req.body;
        if (chapterName) chapter.chapterName = chapterName;

        const updatedChapter = await chapter.save();
        res.status(200).send(updatedChapter);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deleteChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (!chapter) {
            return res.status(404).send({ error: "Chapter not found" });
        }

        await chapter.remove();
        res.status(200).send(chapter);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getChapterIdByName = async (req, res) => {
    try {
        const { moduleName, chapterName } = req.query;

        if (!moduleName || !chapterName) {
            return res.status(400).json({ message: "Module name and chapter name are required." });
        }

        // Step 1: Find the module by name
        const module = await Module.findOne({ moduleName });
        if (!module) {
            return res.status(404).json({ message: "Module not found." });
        }

        // Step 2: Find the chapter by name within the module
        const chapter = await Chapter.findOne({moduleId: module._id, chapterName});
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found." });
        }

        // Step 3: Return the chapter's ObjectId
        res.status(200).json({ chapterId: chapter._id });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createChapter,
    updateChapter,
    deleteChapter,
    getChapterIdByName,
};
