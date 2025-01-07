const Module = require("../models/Module");
const Chapter = require("../models/Chapter");
const Question = require("../models/Question");

const getQuestionsByLevel = async (req, res) => {
  try {
      const { studyLevel, limit = 24, page = 1, search, ...filters } = req.query;
      console.log('Query params:', { studyLevel, limit, page, search, filters }); // Debug log

      // Find modules
      let moduleIds = [];
      if(filters.subjects) {
        moduleIds = filters.subjects.split(',');
      }else {
        // Get all modules for the study level if no specific subjects selected
        const modules = await Module.find({ studyLevel });
        moduleIds = modules.map(m => m._id);
      }
      if (!moduleIds.length) {
        return res.status(200).json({ results: [], totalPages: 0, totalItems: 0 });
      }
      let chapterIds = [];
        if(filters.chapters) {
            chapterIds = filters.chapters.split(',');
        }
        else {
            // Get all chapters for the selected modules
            const allChapters = await Chapter.find({ moduleId: { $in: moduleIds } });
            chapterIds = allChapters.map(c => c._id);
          }


      if (!chapterIds.length) {
        return res.status(200).json({ results: [], totalPages: 0, totalItems: 0 });
      }


      // Build query
      let query = { chapterId: { $in: chapterIds } };
      
      if (search) {
          query.questionText = { $regex: search, $options: "i" };
      }

    //   // Remove empty filter values
    //   const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
    //       if (value && value !== "") {
    //           acc[key] = value;
    //       }
    //       return acc;
    //   }, {});

    //   if (Object.keys(cleanFilters).length > 0) {
    //       Object.assign(query, cleanFilters);
    //   }

      console.log('Final query:', query); // Debug log

      // Execute query
      const [questions, totalItems] = await Promise.all([
        Question.find(query)
          .sort("-createdAt")
          .skip((page - 1) * parseInt(limit))
          .limit(parseInt(limit))
          .populate('chapterId'),
        Question.countDocuments(query)
      ]);
  
      const totalPages = Math.ceil(totalItems / parseInt(limit));
  
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