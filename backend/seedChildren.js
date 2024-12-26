const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path if necessary
const Child = require('./models/Child'); // Adjust the path if necessary

const seedChildren = async () => {
  try {
    // Step 1: Find the user by ID (or create a new user if needed)
    const userId = new mongoose.Types.ObjectId("67695c8f64339b51ba70132e"); // Example user ID

    // Step 2: Create the children and associate with the userId
    const children = [
      {
        userId: userId,
        firstName: 'Ali',
        lastName: 'Ahmed',
        studyLevel: 'Primary School'
      },
      {
        userId: userId,
        firstName: 'Sara',
        lastName: 'Ben Ali',
        studyLevel: 'High School'
      },
      {
        userId: userId,
        firstName: 'Omar',
        lastName: 'Sami',
        studyLevel: 'University'
      }
    ];

    // Step 3: Insert children into the database
    await Child.insertMany(children);

    console.log('Children have been successfully created and linked to the user!');
  } catch (error) {
    console.error('Error while seeding children:', error);
  }
};

// Run the seed function
module.exports = seedChildren;
