const mongoose = require('mongoose');

const fullQuizSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now }, // Automatically set to the current date
  score: { type: Number, default: 0 }, // Initialize score to 0
  length: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false }, // Indicates if the quiz is completed
});

module.exports = mongoose.model('FullQuiz', fullQuizSchema);
