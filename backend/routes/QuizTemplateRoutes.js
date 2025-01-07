const express = require('express');
const QuizTemplate = require('../models/QuizTemplate');

const router = express.Router();

// Create a new QuizTemplate
router.post('/', async (req, res) => {
    try {
        const { title, module, child, questions, chapters } = req.body;
        const newQuizTemplate = new QuizTemplate({
            title,
            module,
            child,
            questions,
            chapters,
            playedCount: 1, // Default value
            progress: 0, // Default value
            scores: [] // Default value
        });
        await newQuizTemplate.save();
        res.status(201).json(newQuizTemplate);
    } catch (err) {
        console.error('Error creating QuizTemplate:', err);
        res.status(500).json({ error: 'Failed to create QuizTemplate' });
    }
});

// Update a QuizTemplate by ID (PATCH)
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedQuizTemplate = await QuizTemplate.findByIdAndUpdate(
            id,
            updates,
            { new: true } // Return the updated document
        );
        if (!updatedQuizTemplate) {
            return res.status(404).json({ error: 'QuizTemplate not found' });
        }
        res.status(200).json(updatedQuizTemplate);
    } catch (err) {
        console.error('Error updating QuizTemplate:', err);
        res.status(500).json({ error: 'Failed to update QuizTemplate' });
    }
});

// Get QuizTemplates based on query parameters
router.get('/', async (req, res) => {
    try {
        const { limit, sort, playedCount,...filters } = req.query;
        let query = QuizTemplate.find({
            ...filters,
            playCount: playedCount == 1 ? { $lte: playedCount } : { $gte: playedCount }
        });

        if (sort) {
            query = query.sort(sort);
        }
        if (limit) {
            query = query.limit(parseInt(limit));
        }

        const quizTemplates = await query.exec();
        
        res.status(200).json(quizTemplates);
    } catch (err) {
        console.error('Error fetching QuizTemplates:', err);
        res.status(500).json({ error: 'Failed to fetch QuizTemplates' });
    }
});

module.exports = router;