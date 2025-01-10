const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    questionText: {
        type: String,
        required: [true, "Question text is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
    },
    options: {
        type: [String],
        validate: {
            validator: function (options) {
                return options.length === 3;
            },
            message: "Exactly 3 options are required",
        },
        required: [true, "Options are required"],
    },
    hint: {
        type: String,
        default: null,
    },
});

const quizSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Quiz name is required"],
    },
    number: {
        type: Number,
        required: [true, "Quiz number is required"],
    },
    questions: {
        type: [questionSchema],
        required: [true, "Questions are required"],
    },
    score: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Quiz", quizSchema);
