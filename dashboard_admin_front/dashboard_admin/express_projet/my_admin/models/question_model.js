const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    falseOptions: {
        type: [String],
        validate: {
            validator: (v) => Array.isArray(v) && v.length === 3,
            message: "falseOptions must be an array of exactly 3 incorrect answers.",
        },
        required: true,
    },
    explanation: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
