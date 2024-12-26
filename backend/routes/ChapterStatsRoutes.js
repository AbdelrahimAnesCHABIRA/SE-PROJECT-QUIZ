const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz'); // Adjust the path as necessary
const router = express.Router();

// Function to get the number of FullQuizzes by chapter
const getFullQuizzesCountByChapter = async (childId, chapterId) => {
  const result = await Quiz.aggregate([
    {
      $lookup: {
        from: 'questions',
        localField: 'question_id',
        foreignField: '_id',
        as: 'questionDetails',
      },
    },
    {
      $unwind: '$questionDetails',
    },
    {
      $match: {
        'questionDetails.chapterId': new mongoose.Types.ObjectId(chapterId),
        child_id: new mongoose.Types.ObjectId(childId),
      },
    },
    {
      $group: {
        _id: '$fullquiz_id',
      },
    },
    {
      $count: 'numFullQuizzes',
    },
  ]);

  return result[0]?.numFullQuizzes || 0;
};

// Function to get stats (count, average score, highest score) for quizzes
const getQuizStatsByChapter = async (childId, chapterId) => {
  const result = await Quiz.aggregate([
    {
      $lookup: {
        from: 'questions',
        localField: 'question_id',
        foreignField: '_id',
        as: 'questionDetails',
      },
    },
    {
      $unwind: '$questionDetails',
    },
    {
      $match: {
        'questionDetails.chapterId': new mongoose.Types.ObjectId(chapterId),
        child_id: new mongoose.Types.ObjectId(childId),
      },
    },
    {
      $group: {
        _id: '$fullquiz_id',
        totalScore: { $sum: '$score' },
      },
    },
    {
      $group: {
        _id: null,
        numFullQuizzes: { $sum: 1 },
        avgScore: { $avg: '$totalScore' },
        highestScore: { $max: '$totalScore' },
      },
    },
  ]);

  return result[0] || { numFullQuizzes: 0, avgScore: 0, highestScore: 0 };
};

// Route to fetch stats for a chapter
router.get('/', async (req, res) => {
  const { child_id, chapter_id } = req.query;

  if (!child_id || !chapter_id) {
    return res.status(400).json({ error: 'child_id and chapter_id are required.' });
  }

  try {
    const numFullQuizzes = await getFullQuizzesCountByChapter(child_id, chapter_id);
    const quizStats = await getQuizStatsByChapter(child_id, chapter_id);

    res.status(200).json({
      numFullQuizzes,
      avgScore: quizStats.avgScore,
      highestScore: quizStats.highestScore,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats.' });
  }
});

module.exports = router;
