const express = require('express');
const router = express.Router();
const FullQuiz = require('../models/FullQuiz'); // Adjust the path based on your folder structure

// POST: Create a new FullQuiz instance
router.post('/', async (req, res) => {
  try {
    // Create a new instance of FullQuiz
    const newFullQuiz = new FullQuiz();

    // Save the instance to the database
    await newFullQuiz.save();

    // Respond with the created instance
    console.log('Full Quiz instance created!')
    res.status(201).json(newFullQuiz);
  } catch (error) {
    console.error('Error creating FullQuiz instance:', error);
    res.status(500).send('Error creating FullQuiz instance.');
  }
});

router.patch('/:id', async (req, res) => {
    try {
        const { score, isCompleted } = req.body;

        // Validate input
        if (score === undefined && isCompleted === undefined) {
            return res.status(400).json({ error: 'At least one field (score or isCompleted) is required.' });
        }

        const updateFields = {};
        if (score !== undefined) {
            updateFields.$inc = { score: score, length: 1 }; // Increment score and length
        }
        if (isCompleted !== undefined) {
            updateFields.$set = { ...updateFields.$set, isCompleted }; // Set isCompleted
        }

        const fullQuiz = await FullQuiz.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true } // Return the updated document
        );

        if (!fullQuiz) {
            return res.status(404).json({ error: 'FullQuiz not found.' });
        }

        console.log('Full Quiz instance updated:', fullQuiz);
        res.status(200).json(fullQuiz);
    } catch (error) {
        console.error('Error updating FullQuiz:', error);
        res.status(500).json({ error: 'Failed to update FullQuiz.' });
    }
});


router.get('/', async (req, res) => {
    try {
        const fullQuizzes = await FullQuiz.find();
        res.status(200).json(fullQuizzes);
    } catch (error) {
        console.error('Error retrieving FullQuizzes:', error);
        res.status(500).json({ error: 'Failed to retrieve FullQuizzes.' });
    }
});

module.exports = router;
