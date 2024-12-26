const mongoose = require('mongoose');
require('dotenv').config();

// Import your models
const User = require('./models/User');
const Module = require('./models/Module');
const Child = require('./models/Child');
const Chapter = require('./models/Chapter');
const Question = require('./models/Question');
const Quiz = require('./models/Quiz');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  seedDatabase();
}).catch((err) => {
  console.error('Database connection error:', err.message);
});

async function seedDatabase() {
  try {
    // Insert dummy data
    // Create a module
    const module = await Module.create({
      moduleName: 'Mathematics',
      studyLevel: 'Grade 5'
    });

    Module.create({
      moduleName: 'Sport',
      StudyLevel: "Primary School",
    })

    Mod


    // Create a chapter for the module
    const chapter = await Chapter.create({
      moduleId: module._id,
      chapterName: 'Algebra'
    });

    // Create a question for the chapter
    const question = await Question.create({
      chapterId: chapter._id,
      questionText: 'What is 5 + 3?',
      correctAnswer: '8',
      explanation: '5 + 3 equals 8.'
    });


    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding the database:', err.message);
    mongoose.connection.close();
  }
}
