const QuizTemplate = require('../models/QuizTemplate');

const getQuizTemplatesSeeAllFilter = async (req, res) => {
  try {
    const { child, limit, skip, subjects, chapters, questionCount } = req.query;
    
    // Build filter object
    const filter = { child: child };
    
    // Add module filter if subjects provided
    if (subjects) {
      filter.module = { $in: subjects.split(',') };
    }
    
    // Add chapters filter if provided
    if (chapters) {
      filter.chapters = { $in: chapters.split(',') };
    }
    
    // Add question count filter if provided
    if (questionCount) {
      const [min, max] = questionCount.split('-').map(Number);
      if (max === '+') {
        filter.length = { $gte: min };
      } else {
        filter.length = { $gte: min, $lte: max };
      }
    }

    // Get total count
    const total = await QuizTemplate.countDocuments(filter);
    
    // Get filtered documents
    const quizTemplates = await QuizTemplate.find(filter)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate('questions')
      .populate('chapters')
      .populate('module');

    // Set total count in header
    res.set('X-Total-Count', total);
    
    // Send response
    res.json(quizTemplates);
    
  } catch (error) {
    console.error('Filter error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuizTemplatesSeeAllFilter
};