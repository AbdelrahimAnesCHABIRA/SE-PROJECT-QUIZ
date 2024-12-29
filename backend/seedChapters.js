const mongoose = require('mongoose');
const Chapter = require('./models/Chapter'); // Adjust path based on your folder structure

// Example chapter data
const chapters = [
    // Chapters for اللغة العربية
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'Les lettres et les sons' // Letters and sounds
    },
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'Les mots et leurs sens' // Words and meanings
    },
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'La construction des phrases' // Sentence construction
    },
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'La lecture des textes simples' // Reading simple texts
    },
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'L\'écriture des phrases simples' // Writing simple sentences
    },
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'Les genres et les nombres' // Gender and number (grammar basics)
    },
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'Les conjugaisons de base' // Basic conjugations
    },
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'Les expressions orales' // Oral expressions
    },
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'Les comptines et poèmes' // Rhymes and poems
    },
    {
        moduleId: '676d86295ca6e92be9e4a9a3',
        chapterName: 'La compréhension des histoires' // Story comprehension
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
