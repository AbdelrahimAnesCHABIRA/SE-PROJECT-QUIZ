const express = require('express');
const router = express.Router();
const {
    getStudyLevels,
    isValidStudyLevel,
    addStudyLevel
} = require('../models/studyLevels');

// API endpoint to fetch study levels
router.get('/', (req, res) => {
    res.json(getStudyLevels());
});

module.exports = router;