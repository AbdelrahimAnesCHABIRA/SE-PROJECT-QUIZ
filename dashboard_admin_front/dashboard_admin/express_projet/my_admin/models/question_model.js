const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  questionText: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  falseOptions: { type: [String], required: true },
  explanation: { type: String },
});

module.exports = mongoose.model('Question', questionSchema);