const mongoose = require('mongoose');
const Chapter = require('./models/Chapter'); // Adjust path based on your folder structure

// Example chapter data
const chapters = [
    // Chapters for اللغة العربية
    { moduleId: '676d86295ca6e92be9e4a9a2', chapterName: 'القواعد النحوية' }, // Grammar Rules
    { moduleId: '676d86295ca6e92be9e4a9a2', chapterName: 'القراءة والنصوص' }, // Reading and Texts
    { moduleId: '676d86295ca6e92be9e4a9a2', chapterName: 'الإملاء والتعبير' }, // Spelling and Expression

    // Chapters for الرياضيات
    { moduleId: '676d86295ca6e92be9e4a9a1', chapterName: 'الجمع والطرح' }, // Addition and Subtraction
    { moduleId: '676d86295ca6e92be9e4a9a1', chapterName: 'الضرب والقسمة' }, // Multiplication and Division
    { moduleId: '676d86295ca6e92be9e4a9a1', chapterName: 'الأشكال الهندسية' } // Geometric Shapes
];

// Seed the chapters
const seedChapters = async () => {
    try {
        await Chapter.deleteMany(); // Clear existing chapters
        console.log('Existing Chapters cleared');
        await Chapter.insertMany(chapters);
        console.log('Chapters seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding chapters:', err);
        mongoose.connection.close();
    }
};

module.exports = seedChapters;
