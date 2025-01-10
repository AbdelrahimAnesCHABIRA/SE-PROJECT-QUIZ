const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// POST
router.post('/', async (req, res) => {
    try {
        const { question_id, child_id,fullquiz_id,  score, tryNum } = req.body;
        console.log('trying to create a quiz instance :'+ question_id +' , '+ child_id + ' , ' + fullquiz_id + ' , ' + score + ' , ' + tryNum) ;

        if (
            question_id === undefined || 
            child_id === undefined || 
            fullquiz_id === undefined || 
            score === undefined || 
            tryNum === undefined
        ) {
            return res.status(400).send('Missing required fields.');
        }

        const newQuiz = new Quiz({
            question_id,
            child_id,
            fullquiz_id,
            score,
            tryNum,
        });

        await newQuiz.save();
        console.log('Quiz instance created successfully')
        res.status(201).json(newQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating quiz instance.');
    }
});

router.get('/', async (req, res) => {
    try {
        const { fullquiz_id, child_id, question_id, tryNum } = req.query;

        const query = {};
        if (fullquiz_id) query.fullquiz_id = fullquiz_id;
        if (child_id) query.child_id = child_id;
        if (question_id) query.question_id = question_id;
        if (tryNum && tryNum !== '-1') query.tryNum = tryNum;

        let quizzes;
        if (tryNum === '-1') {
            const maxQuiz = await Quiz.findOne(query).sort({ tryNum: -1 }).limit(1);
            if (!maxQuiz) {
                return res.status(404).send('No quizzes found.');
            }
            quizzes = await Quiz.find({ ...query, tryNum: maxQuiz.tryNum }).populate('question_id');
        } else {
            quizzes = await Quiz.find(query).populate('question_id');
        }
        res.status(200).json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving quiz instances.');
    }
});


module.exports = router;