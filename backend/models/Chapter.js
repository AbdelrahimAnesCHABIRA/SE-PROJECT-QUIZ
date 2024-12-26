const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  chapterName: { type: String, required: true },
});

module.exports = mongoose.model('Chapter', chapterSchema);
