const QuizTemplate = require('../models/QuizTemplate');

// ...existing code...
const getQuizTemplatesSeeAll = async (req, res) => {
  try {
    const { skip, limit } = req.pagination;
    const childId = req.query.child;
    const sort = req.query.sort || '-createdAt';

    // Add the conditional here
    if (req.query.archive === 'true') {
      const queryArchive = { child: childId, playCount: { $gte: 2 } };
      const [quizzes, total] = await Promise.all([
        QuizTemplate.find(queryArchive)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .populate('questions')
          .populate('chapters')
          .populate('module'),
        QuizTemplate.countDocuments(queryArchive),
      ]);
      res.set('X-Total-Count', total);
      return res.json(quizzes);
    }

    const query = { child: childId };
    const total = await QuizTemplate.countDocuments(query);
    const quizTemplates = await QuizTemplate.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('questions')
      .populate('chapters')
      .populate('module');

    res.set('X-Total-Count', total);
    res.json(quizTemplates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ...existing code...
module.exports = {
    getQuizTemplatesSeeAll
};


  