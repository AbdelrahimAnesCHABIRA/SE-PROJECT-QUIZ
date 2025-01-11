const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  studyLevel: { type: String, required: true },
  imageUrl: {type: String, required: false},
});

module.exports = mongoose.model('Child', childSchema);