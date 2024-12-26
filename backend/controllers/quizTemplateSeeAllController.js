const QuizTemplate = require('../models/QuizTemplate');

const getQuizTemplatesSeeAll = async (req, res) => {
  try {
    const { skip, limit } = req.pagination;
    const childId = req.query.child;
    const sort = req.query.sort || '-createdAt';

    const query = { child: childId };
    
    // Get total count
    const total = await QuizTemplate.countDocuments(query);

    // Get paginated results
    const quizTemplates = await QuizTemplate.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('questions')
      .populate('chapters')
      .populate('module');

    // Set total count in header
    res.set('X-Total-Count', total);
    
    res.json(quizTemplates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getQuizTemplatesSeeAll
};


  