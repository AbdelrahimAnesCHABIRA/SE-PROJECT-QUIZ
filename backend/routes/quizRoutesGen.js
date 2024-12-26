const express = require('express');
const path = require('path');
const fs = require('fs');
const { generateMCQs } = require('../services/aiService');
const { extractTextFromFile, validateFileType } = require('../utils/fileHandler');
const config = require('../config');
const Question = require('../models/Question');
const QuizTemplate = require('../models/QuizTemplate');

const router = express.Router();

router.post('/generate', async (req, res) => {
    console.log(req.body);
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.files.file;
        const numQuestions = parseInt(req.body.numQuestions, 10) || 5;
        const { chapterId, childId, moduleId, title } = req.body;

        if (!chapterId || !childId || !moduleId || !title) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (!validateFileType(file.name)) {
            return res.status(400).json({ message: 'Invalid file format' });
        }

        const filePath = path.join(process.cwd(), config.uploadDir, file.name);
        await file.mv(filePath);

        const text = await extractTextFromFile(filePath);
        const rawResponse = await generateMCQs(text, numQuestions);

        const rawText = typeof rawResponse === 'string' ? rawResponse : rawResponse.mcqs;
        if (!rawText || typeof rawText !== 'string') {
            throw new Error('Invalid MCQs response from generateMCQs');
        }

        const mcqBlocks = rawText.trim().split('\n\n');
        const mcqArray = mcqBlocks.map((block) => {
          const lines = block.split('\n').map(line => line.trim());
          const questionText = lines[0].replace('Question: ', '').trim();
          
          // Remove A,B,C,D labels and clean options more thoroughly
          const options = lines.slice(1, -1).map((line) => {
              return line.replace(/^[A-D][\):\.]?\s*/, '').trim(); // Matches A), A:, A. patterns
          });
          
          // Extract and clean correct answer
          const correctAnswerLine = lines[lines.length - 1].replace('Correct Answer: ', '').trim();
          const answerLabel = correctAnswerLine.charAt(0);
          const correctAnswer = options[answerLabel.charCodeAt(0) - 65].replace(/^[A-D][\):\.]?\s*/, '').trim();
          
          // Create clean falseOptions
          const falseOptions = options
              .map(opt => opt.replace(/^[A-D][\):\.]?\s*/, '').trim())
              .filter(opt => opt !== correctAnswer);
      
          if (questionText && correctAnswer) {
              return {
                  questionText,
                  correctAnswer,
                  falseOptions,
                  chapterId
              };
          }
          return null;
      }).filter(Boolean);

        if (mcqArray.length < numQuestions) {
            return res.status(400).json({ message: 'Not enough valid MCQs generated' });
        }

        // Save questions to database
        const savedQuestions = await Question.insertMany(mcqArray);
        const questionIds = savedQuestions.map(q => q._id);

        // Create quiz template
        const quizTemplate = new QuizTemplate({
            title,
            module: moduleId,
            child: childId,
            questions: questionIds,
            chapters: [chapterId],
            length: questionIds.length
        });

        await quizTemplate.save();

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.status(200).json({
            quizId : quizTemplate._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;