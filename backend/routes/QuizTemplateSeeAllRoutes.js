const express = require('express');
const router = express.Router();
const { getQuizTemplatesSeeAll } = require('../controllers/quizTemplateSeeAllController');
const paginationMiddleware = require('../middleware/paginationMiddleware');

router.get('/', paginationMiddleware, getQuizTemplatesSeeAll);

module.exports = router;