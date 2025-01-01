const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
require('dotenv').config();


const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const quizRoutesGen = require('./routes/quizRoutesGen');
const errorHandler = require('./middleware/errorHandler');
const { ensureDirectoryExists } = require('./utils/fileHandler');
const quizTemplateSeeAllRoutes = require('./routes/QuizTemplateSeeAllRoutes');

const ModuleRoutes = require('./routes/ModuleRoutes');
const ChapterRoutes = require('./routes/ChapterRoutes');
const QuestionRoutes = require('./routes/QuestionRoutes');
const StudyLevelsRoutes = require('./routes/studyLevelsRoutes');
const QuizRoutes = require('./routes/QuizRoutes');
const FullQuizRoutes = require('./routes/FullQuizRoutes');
const ChapterStatsRoutes = require('./routes/ChapterStatsRoutes');
const QuizTemplateRoutes = require('./routes/QuizTemplateRoutes');
const UserRoutes = require('./routes/UserRoutes');
const ChildRoutes = require('./routes/ChildRoutes');
const QuizTemplateSearchRoutes = require('./routes/QuizTemplateSearchRoutes');
const QuizTemplateSeeAllFilterRoutes = require('./routes/QuizTemplateSeeAllFilterRoutes');
const AllQuestions = require('./routes/getQuestionsByLevelRouters');

// Add other routes similarly

// const seedModules = require('./seedModules')
const seedChapters = require('./seedChapters')
const seedQuestions = require('./seedQuestions')
// const seedChildren = require('./seedChildren')

const app = express();
app.use(express.json());
// Ensure required directories exist
ensureDirectoryExists(path.join(__dirname, config.uploadDir));
ensureDirectoryExists(path.join(__dirname, config.resultsDir));
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use(cors({
  exposedHeaders: ['X-Total-Count']
}));
// Error handling
app.use(errorHandler);

app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set `secure: true` if using HTTPS
  })
);


// Routes
app.use('/api/Modules', ModuleRoutes);
app.use('/api/Chapters', ChapterRoutes);
app.use('/api/Questions', QuestionRoutes);
app.use('/api/Levels', StudyLevelsRoutes);
app.use('/api/Quiz', QuizRoutes);
app.use('/api/FullQuiz', FullQuizRoutes);
app.use('/api/ChapterStats', ChapterStatsRoutes);
app.use('/api/QuizTemplate' , QuizTemplateRoutes);
app.use('/api/User', UserRoutes);
app.use('/api/Child', ChildRoutes);
app.use('/api', quizRoutesGen);
app.use('/api/QuizTemplateSearch', QuizTemplateSearchRoutes);
app.use('/api/QuizTemplateSeeAll', quizTemplateSeeAllRoutes);
app.use('/api/QuizTemplateSeeAllFilter', QuizTemplateSeeAllFilterRoutes);
app.use('/api/AllQuestions', AllQuestions);


mongoose.connect(process.env.MONGODB_URI)

  .then(() => {
    app.listen(5000, () => console.log('connected to db & listening on port 5000 ...'));

  })
  .catch(err => console.error(err));


