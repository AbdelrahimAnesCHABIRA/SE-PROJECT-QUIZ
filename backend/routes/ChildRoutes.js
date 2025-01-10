const express = require('express');
const router = express.Router();
const Child = require('../models/Child');
const upload = require('../config/multerConfig')

router.get('/', async (req, res)=>{
    try{    
        const {userId} = req.query;
        const query = {};

        if(userId) query.userId = userId;
        children = await Child.find(query);
        res.status(200).json(children);
        
    }catch(err){
        console.error('Error fetching children: ' + err);
        res.status(500).send('Error retrieving child instances.');
    }
})

router.post('/chooseChild', (req, res) => {
    const { childId, studyLevel } = req.body;
  
    if (!childId || !studyLevel) {
      return res.status(400).json({ message: 'Child ID and studyLevel are required' });
    }
  
    // Store the childId in the session
    req.session.childId = childId;
    req.session.studyLevel = studyLevel;
    res.status(200).json({ message: 'Child ID and studyLevel saved to session' });
    console.log('the child id is saved in session  :'+ childId + ' of level : ' + studyLevel);
});

router.get('/session', async (req, res) => {
    // Check if the user is authenticated
    if (!(req.session && req.session.userId)) {
        return res.status(401).json({ error: "User not authenticated" }); 
    }

    // Check if the childId is present in the session
    if (!req.session.childId) {
        return res.status(400).json({ error: "No child selected" }); 
    }

    const userId = req.session.userId;
    const childId = req.session.childId;
    const studyLevel = req.session.studyLevel;
    res.status(200).json({ userId: userId, childId: childId, studyLevel: studyLevel });
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
      const { userId, firstName, lastName, studyLevel } = req.body;
    
      
      // Get the URL of the uploaded image from Cloudinary
      const imageUrl = req.file.path || req.file.url;
      // Create a new child in the database
      const newChild = new Child({
        userId,
        firstName,
        lastName,
        studyLevel,
        imageUrl,
      });
  
      await newChild.save();
      res.status(201).json(newChild);
    } catch (error) {
      console.error('Error creating child:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/', async (req, res) => {
    const { _id } = req.query; // Retrieve _id from the query string
    
    if (!_id) {
      return res.status(400).json({ message: '_id is required' });
    }
  
    try {
      // Delete child from the database using _id
      const deletedChild = await Child.findByIdAndDelete(_id);
  
      if (!deletedChild) {
        return res.status(404).json({ message: 'Child not found' });
      }
  
      return res.status(200).json({ message: 'Child deleted successfully' });
    } catch (error) {
      console.error("Error deleting child:", error);
      return res.status(500).json({ message: 'Failed to delete child. Please try again.' });
    }
  });

module.exports = router;