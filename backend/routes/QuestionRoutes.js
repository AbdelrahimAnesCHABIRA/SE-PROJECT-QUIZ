const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
  const { chapter_id, _id } = req.query; 

    try {
        const query = {};
        if(chapter_id) query.chapterId = chapter_id;
        if(_id) query._id = _id

        const modules = await Question.find(query);
        res.status(200).json(modules);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

module.exports = router;
