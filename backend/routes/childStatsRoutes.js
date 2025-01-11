const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');
const Module = require('../models/Module');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');
const QuizTemplate = require('../models/QuizTemplate');
const Child = require('../models/Child');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    if (!(req.session && req.session.userId)) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Check if the childId is present in the session
    if (!req.session.childId) {
      return res.status(400).json({ error: "No child selected" });
    }
    const childId = req.session.childId;

    // Fetch the child details
    const child = await Child.findById(childId);
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    // Fetch the child's quizzes (no populate, manually fetch fullQuiz data)
    const quizzes = await Quiz.find({ child_id: new mongoose.Types.ObjectId(childId) });

    // Fetch modules that match the child's study level
    const modules = await Module.find({ studyLevel: child.studyLevel });

    // Prepare module information (including coefficient)
    let moduleInfo = {};
    for (let module of modules) {
      moduleInfo[module._id] = {
        name: module.moduleName,
        coefficient: module.coefficient
      };
    }

    let globalScore = 0;
    let moduleScores = {};
    let questionStats = {}; // Track statistics for each question
    let chapterStats = {}; // Track statistics for each chapter

    // Initialize scores for each module
    modules.forEach(module => {
      moduleScores[module.moduleName] = { totalScore: 0, totalQuizzes: 0 };
    });

    // Calculate scores for each module, question, and chapter
    for (const quiz of quizzes) {
      const fullQuizId = quiz.fullquiz_id;
      // Fetch the full quiz object manually using the ID
      const fullQuiz = await QuizTemplate.findById(fullQuizId);

      // Ensure fullQuiz is not null or undefined
      if (fullQuiz && fullQuiz.module) {
        const moduleId = fullQuiz.module; // Assuming each quiz is linked to a module
        const module = moduleInfo[moduleId];

        // Check if module is found and study level matches
        if (module) {
          const moduleScore = module.coefficient ? quiz.score * module.coefficient : quiz.score; // Weighted score based on coefficient
          moduleScores[module.name].totalScore += parseFloat(moduleScore);
          moduleScores[module.name].totalQuizzes += 1;
          globalScore += parseFloat(moduleScore);

          // Process each question in the quiz
          const question = await Question.findById(quiz.question_id);
          if (question) {
            // Initialize question stats if not already
            if (!questionStats[question._id]) {
              questionStats[question._id] = {
                totalScore: 0,
                totalAttempts: 0,
                questionText: question.questionText, // Add the question text
              };
            }

            // Add score for each question (you can adjust based on your logic)
            const questionScore = parseFloat(quiz.score);
            questionStats[question._id].totalScore += questionScore;
            questionStats[question._id].totalAttempts += 1;
          }

          // Process chapters linked to the quiz (assuming quizTemplate has chapters)
          if (fullQuiz.chapters && Array.isArray(fullQuiz.chapters)) {
            for (let chapterId of fullQuiz.chapters) {
              const chapter = await Chapter.findById(chapterId);
              if (chapter) {
                if (!chapterStats[chapter._id]) {
                  chapterStats[chapter._id] = {
                    totalScore: 0,
                    totalQuizzes: 0,
                  };
                }

                // Ensure chapter score is treated as a number
                const chapterScore = parseFloat(quiz.score);
                chapterStats[chapter._id].totalScore += chapterScore;
                chapterStats[chapter._id].totalQuizzes += 1;
              }
            }
          }
        }
      } else {
        console.warn(`No module found for quiz with ID: ${quiz._id}`);
      }
    }

    // Calculate the average score for each module
    Object.keys(moduleScores).forEach(moduleName => {
      const moduleData = moduleScores[moduleName];
      if (moduleData.totalQuizzes > 0) {
        moduleData.averageScore = moduleData.totalScore / moduleData.totalQuizzes;
      } else {
        moduleData.averageScore = 0;
      }
    });

    // Calculate global average score
    const totalQuizzesAttempted = quizzes.length;
    const globalAverageScore = totalQuizzesAttempted > 0 ? globalScore / totalQuizzesAttempted : 0;

    // Prepare the statistics response
    const stats = {
      globalScore: globalScore,
      globalAverageScore: globalAverageScore,
      moduleScores: moduleScores,
      questionStats: questionStats,
      chapterStats: chapterStats,
    };

    res.status(200).json(stats);
  } catch (err) {
    console.error('Error calculating statistics:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
