
//this file is used to search for quiz templates based on the search query and filters
const express = require('express');
const QuizTemplate = require('../models/QuizTemplate');

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const { limit = 12, page = 1, search, ...filters } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (Object.keys(filters).length > 0) {
            Object.assign(query, filters);
        }

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