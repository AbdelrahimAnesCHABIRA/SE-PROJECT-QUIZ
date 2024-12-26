
//this file is used to search for quiz templates based on the search query and filters
const express = require('express');
const QuizTemplate = require('../models/QuizTemplate');

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const { limit = 12, page = 1, search, ...filters } = req.query;
        const query = {
            ...filters,
            ...(search && { title: { $regex: search, $options: 'i' } })
        };

        const totalItems = await QuizTemplate.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);

        const quizTemplates = await QuizTemplate.find(query)
            .sort('-createdAt')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            results: quizTemplates,
            totalPages
        });
    } catch (err) {
        console.error('Error fetching QuizTemplates:', err);
        res.status(500).json({ error: 'Failed to fetch QuizTemplates' });
    }
});

module.exports = router;