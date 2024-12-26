const express = require('express');
const router = express.Router();
const paginationMiddleware = require('../middleware/paginationMiddleware');
const { getQuizTemplatesSeeAllFilter } = require('../controllers/quizTemplateSeeAllFilterController');

router.get('/', paginationMiddleware, getQuizTemplatesSeeAllFilter);
module.exports = router;