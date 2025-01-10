const mongoose = require('mongoose');
const Chapter = require('./models/Chapter'); // Adjust path based on your folder structure

// Example chapter data
const chapters = [
    // Chapters for اللغة العربية
    {
        moduleId: '67813bfc6fd6f2e14bf1d0e3',
        chapterName: 'Les lettres et les sons' // Letters and sounds
    }
];

// Seed the chapters
const seedChapters = async () => {
    try {
        await Chapter.insertMany(chapters);
        console.log('Chapters seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding chapters:', err);
        mongoose.connection.close();
    }
};

module.exports = seedChapters;
