const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

// Get all modules
router.get('/', async (req, res) => {
    console.log(req.query);
  const { level } = req.query; // Extract the study level from the query parameter

    try {
        // If a level is provided, filter by it; otherwise, fetch all modules
        const query = level ? { studyLevel: level } : {};
        const modules = await Module.find(query); // Replace ModuleModel with your actual model
        res.status(200).json(modules);
    } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).json({ error: 'Failed to fetch modules' });
    }
});

module.exports = router;
