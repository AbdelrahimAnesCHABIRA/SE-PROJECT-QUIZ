const express = require('express');
const router = express.Router();
const paginationMiddleware = require('../middleware/paginationMiddleware');
const { getQuestionsByLevel } = require('../controllers/getQuestionsByLevelController');

router.get('/', paginationMiddleware, getQuestionsByLevel);

module.exports = router;