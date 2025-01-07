const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig'); // Import Cloudinary config

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'children', // Folder name in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png'], // Accepted file formats
  },
});

const upload = multer({ storage });

module.exports = upload;



