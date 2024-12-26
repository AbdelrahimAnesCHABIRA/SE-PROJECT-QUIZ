const mongoose = require('mongoose');

// Define the module schema
const Module = require('./models/Module');

// Sample data for modules
const modules = [
  { moduleName: 'الرياضيات', studyLevel: 'Primary' }, // Mathematics
  { moduleName: 'اللغة العربية', studyLevel: 'Primary' }, // Arabic Language
  { moduleName: 'اللغة الفرنسية', studyLevel: 'Primary' }, // French Language
  { moduleName: 'التربية الإسلامية', studyLevel: 'Primary' }, // Islamic Education
  { moduleName: 'التاريخ والجغرافيا', studyLevel: 'Primary' }, // History and Geography
  { moduleName: 'التربية العلمية', studyLevel: 'Primary' }, // Scientific Education
  { moduleName: 'التربية البدنية', studyLevel: 'Primary' }, // Physical Education
  { moduleName: 'التربية الفنية', studyLevel: 'Primary' }, // Artistic Education
  { moduleName: 'التربية الموسيقية', studyLevel: 'Primary' }  // Musical Education
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Module.deleteMany();
    console.log('Existing modules cleared.');

    // Insert sample modules
    await Module.insertMany(modules);
    console.log('Sample modules inserted.');

    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

module.exports = seedDatabase;
