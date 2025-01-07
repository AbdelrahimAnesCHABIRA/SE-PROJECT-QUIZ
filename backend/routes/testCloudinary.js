const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); 

// Test route for image upload
router.post('/', upload.single('image'), (req, res) => {
  try {
    // Log uploaded file details
    console.log('Uploaded File:', req.file);

    // Respond with the file details
    res.status(200).json({
      message: 'Image uploaded successfully!',
      file: req.file,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(400).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;