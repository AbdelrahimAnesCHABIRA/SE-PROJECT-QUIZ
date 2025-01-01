const Module = require("../models/Module");
const Chapter = require("../models/Chapter");
const Question = require("../models/Question");

const getQuestionsByLevel = async (req, res) => {
  try {
      const { studyLevel, limit = 24, page = 1, search, ...filters } = req.query;
      console.log('Query params:', { studyLevel, limit, page, search, filters }); // Debug log

      // Find modules
      const modules = await Module.find({ studyLevel });
      if (!modules.length) {
          return res.status(200).json({ results: [], totalPages: 0 });
      }
      
      const moduleIds = modules.map((m) => m._id);
      console.log('Found moduleIds:', moduleIds); // Debug log

      // Find chapters
      const chapters = await Chapter.find({ moduleId: { $in: moduleIds } });
      if (!chapters.length) {
          return res.status(200).json({ results: [], totalPages: 0 });
      }
      
      const chapterIds = chapters.map((c) => c._id);
      console.log('Found chapterIds:', chapterIds); // Debug log

      // Build query
      let query = { chapterId: { $in: chapterIds } };
      
      if (search) {
          query.questionText = { $regex: search, $options: "i" };
      }

      // Remove empty filter values
      const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
          if (value && value !== "") {
              acc[key] = value;
          }
          return acc;
      }, {});

      if (Object.keys(cleanFilters).length > 0) {
          Object.assign(query, cleanFilters);
      }

      console.log('Final query:', query); // Debug log

      // Execute query
      const questions = await Question.find(query)
          .sort("-createdAt")
          .skip((page - 1) * parseInt(limit))
          .limit(parseInt(limit));

      const totalItems = await Question.countDocuments(query);
      const totalPages = Math.ceil(totalItems / parseInt(limit));

      console.log(`Found ${questions.length} questions`); // Debug log

      return res.status(200).json({
          results: questions,
          totalPages,
          totalItems
      });

  } catch (error) {
      console.error("Error in getQuestionsByLevel:", error);
      return res.status(500).json({ 
          message: "Error fetching questions",
          error: error.message 
      });
  }
};
  module.exports = {
    getQuestionsByLevel
};