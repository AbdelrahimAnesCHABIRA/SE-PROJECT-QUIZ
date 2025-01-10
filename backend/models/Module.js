const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  moduleName: { type: String, required: true },
  studyLevel: { type: String, required: true },
  imageUrl: {type: String, required: false},
});

module.exports = mongoose.model('Module', moduleSchema);
