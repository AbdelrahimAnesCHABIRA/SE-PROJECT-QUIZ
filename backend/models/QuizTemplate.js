const mongoose = require('mongoose');

const quizTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the quiz template
  createdAt: { type: Date, default: Date.now }, // Automatically set to the current date
  scores: [{ type: Number, default: 0 }], // Array of scores, initialized to empty
  length: { type: Number, default: 0 }, // Total number of questions in the quiz
  progress: { type: Number, default: 0 }, // Number of questions answered in the last attempt
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, // Array of question references
  ],
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true }, // Reference to the child who created the quiz
  playCount: { type: Number, default: 1 }, // Number of times the quiz has been played
  chapters: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true }, // Array of chapter references
  ],
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
});

module.exports = mongoose.model('QuizTemplate', quizTemplateSchema);

