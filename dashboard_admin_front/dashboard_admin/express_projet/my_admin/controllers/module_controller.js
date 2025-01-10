const ModuleModel = require("../models/module_model");
const Chapter = require("../models/chapter_model");
const chapterController = require("./chapter_controller"); // Import Chapter Controller

const getModules = async (req, res) => {
    try {
        const modules = await ModuleModel.find().populate('chapters');
        res.status(200).send(modules);
    } catch (error) {
        res.status(500).send({ error: "Error: " + error.message });
    }
};

const getModuleById = async (req, res) => {
    try {
        const module = await ModuleModel.findById(req.params.id).populate('chapters');
        if (!module) {
            return res.status(404).send({ error: "Module not found" });
        }
        res.status(200).send(module);
    } catch (error) {
        res.status(500).send({ error: "Error: " + error.message });
    }
};

const createModule = async (req, res) => {
    try {
        const { moduleName, studyLevel } = req.body;
        if (!moduleName || !studyLevel) {
            return res.status(400).send({ error: "Required parameters are missing" });
        }

        const module = new ModuleModel({
            moduleName,
            studyLevel,
        });

        await module.save();
        res.status(201).send(module);
    } catch (error) {
        res.status(500).send({ error: "Error: " + error.message });
    }
};

const updateModule = async (req, res) => {
    try {
        const module = await ModuleModel.findById(req.params.id);
        if (!module) {
            return res.status(404).send({ error: "Module not found" });
        }

        const { moduleName, studyLevel, addChapters, deleteChapters, modifyChapters } = req.body;

        // Update moduleName and studyLevel if provided
        if (moduleName) module.moduleName = moduleName;
        if (studyLevel) module.studyLevel = studyLevel;

        // Add new chapters
        if (addChapters && Array.isArray(addChapters)) {
            const newChapters = await Promise.all(
                addChapters.map(async (chapter) => {
                    const newChapter = new Chapter({ chapterName: chapter.chapterName });
                    await newChapter.save();
                    return newChapter._id;
                })
            );
            module.chapters.push(...newChapters);
        }

        // Delete chapters by their IDs
        if (deleteChapters && Array.isArray(deleteChapters)) {
            module.chapters = module.chapters.filter(
                (chapterId) => !deleteChapters.includes(chapterId)
            );
        }

        // Modify chapters by ID
        if (modifyChapters && Array.isArray(modifyChapters)) {
            modifyChapters.forEach(async (chapter) => {
                const existingChapter = await Chapter.findById(chapter.chapterId);
                if (existingChapter) {
                    existingChapter.chapterName = chapter.newName;
                    await existingChapter.save();
                }
            });
        }

        const updatedModule = await module.save();
        res.status(200).send(updatedModule);
    } catch (error) {
        res.status(500).send({ error: "Error: " + error.message });
    }
};

const deleteModuleByNameAndLevel = async (req, res) => {
    const { moduleName, studyLevel } = req.body;
    try {
        const deletedModule = await ModuleModel.findOneAndDelete({ moduleName, studyLevel });
        if (!deletedModule) {
            return res.status(404).json({ message: "Module not found." });
        }
        res.status(200).json({ message: "Module deleted successfully.", module: deletedModule });
    } catch (error) {
        res.status(500).json({ error: `Error deleting module: ${error.message}` });
    }
};




module.exports = {
    getModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModuleByNameAndLevel,
};
