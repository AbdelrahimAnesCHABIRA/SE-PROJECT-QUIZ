const express = require('express');
const router = express.Router();
const Child = require('../models/Child');

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
    const { childId } = req.body;
  
    if (!childId) {
      return res.status(400).json({ message: 'Child ID is required' });
    }
  
    // Store the childId in the session
    req.session.childId = childId;
    res.status(200).json({ message: 'Child ID saved to session' });
    console.log('the child id is saved in session  :'+ childId);
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
    res.status(200).json({ userId: userId, childId: childId });
});


module.exports = router;