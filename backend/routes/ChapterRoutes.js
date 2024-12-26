const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');

// Get all Chapters
router.get('/', async (req, res) => {
  const {module_id} = req.query;
  try {
    const query = module_id ? { moduleId: module_id } : {};
    const chapters = await Chapter.find(query); 
    res.status(200).json(chapters);
} catch (error) {
    console.error('Error fetching chapters:', error);
    res.status(500).json({ error: 'Failed to fetch chapters' });
}
});

module.exports = router;
