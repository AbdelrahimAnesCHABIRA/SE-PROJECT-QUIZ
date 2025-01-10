const QuizModel = require("../models/quiz_model");

const getQuizzes = async (req, res) => {
    try {
        const quizzes = await QuizModel.find();
        res.status(200).send(quizzes);
    } catch (error) {
        res.status(500).send({ error : "abdo" + error.message });
    }
};

const getQuizById = async (req, res) => {
    try {
        const quiz = await QuizModel.findById(req.params.id);
        if (!quiz) {
            return res.status(404).send({ error: "Quiz not found" });
        }
        res.status(200).send(quiz);
    } catch (error) {
        res.status(500).send({ error:  "abdou" +error.message });
    }
};

const createQuiz = async (req, res) => {
    try {
        const { name, number, questions } = req.body;
        if (!name || !number || !questions || !Array.isArray(questions)) {
            return res.status(400).send({ error: "Required parameters are missing or invalid" });
        }
        const formattedQuestions = questions.map(question => {
            const { questionText, answer, options, hint } = question;
            if (!questionText || !answer || !options || options.length !== 3) {
                throw new Error("Each question must have a questionText, an answer, 3 options, and an optional hint");
            }
            return { questionText, answer, options, hint };
        });

        const quiz = new QuizModel({
            name,
            number,
            questions: formattedQuestions,
        });
        await quiz.save();
        res.status(201).send(quiz);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateQuiz = async (req, res) => {
    try {
        const quiz = await QuizModel.findById(req.params.id);
        if (!quiz) {
            return res.status(404).send({ error: "Quiz not found" });
        }

        const { questions } = req.body;
        if (questions && Array.isArray(questions)) {
            quiz.questions = questions.map(question => {
                const { questionText, answer, options, hint } = question;
                if (!questionText || !answer || !options || options.length !== 3) {
                    throw new Error("Each question must have a questionText, an answer, 3 options, and an optional hint");
                }
                return { questionText, answer, options, hint };
            });
        }

        const updatedQuiz = await quiz.save();
        res.status(200).send(updatedQuiz);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deleteQuiz = async (req, res) => {
    try {
        const quiz = await QuizModel.findById(req.params.id);
        if (!quiz) {
            return res.status(404).send({ error: "Quiz not found" });
        }
        await quiz.remove();
        res.status(200).send(quiz);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
};
