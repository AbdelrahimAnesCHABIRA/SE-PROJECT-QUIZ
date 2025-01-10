const mongoose = require('mongoose');
const Chapter = require('./chapter_model'); // Importing Chapter model

const moduleSchema = mongoose.Schema({
    moduleName: {
        type: String,
        required: [true, "Module name is required"],
    },
    studyLevel: {
        type: String,
        required: [true, "Study level is required"],
    },
    chapters: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Chapter', // Referencing the Chapter model
        default: [],
    },
});

module.exports = mongoose.model("Module", moduleSchema);
