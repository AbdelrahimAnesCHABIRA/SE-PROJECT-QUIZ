const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')

router.post('', async (req, res)=> {
    try{
        const {firstName, lastName, passwordHash, email} = req.body;

        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const passwordHashed = await bcrypt.hash(passwordHash, salt);
        const user = new User({
            firstName:firstName,
            lastName:lastName,
            passwordHash:passwordHashed,
            email:email

        })
        await user.save();
        res.status(200).json(user);
    }catch(err){
        console.log('error creating the user' + err)
        res.status(500).json({error: "Failed to create the user"})
    }
});

router.get('', async (req,res) => {

    try{
    const {email} = req.query;

    const query = {}
    if(email) query.email = email;

    response = await User.find(query);
    res.status(200).json(response);
    }catch(err){
        console.log('cannot get users' + err)
        res.status(500).json({error: "cannot display users"})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        req.session.userId = user._id;
        console.log("the user id saved in session : "+req.session.userId)
        // Successfully logged in
        res.status(200).json({ message: "Login successful", user });

    } catch (err) {
        console.log('Error during login:', err);
        res.status(500).json({ error: "Login failed" });
    }
});

router.get('/profile', async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: "Not authenticated" });
        }

        // Find the user by the session user ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });

    } catch (err) {
        console.log('Error fetching profile:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to logout" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
});

router.get('/session', async (req, res) => {
    if (!(req.session && req.session.userId)) {
        return res.status(401).json({ error: "not authenticated" });  // Early return to stop further execution
    }
    
    const userId = req.session.userId;
    res.status(200).json({ userId: userId });
});




module.exports = router;