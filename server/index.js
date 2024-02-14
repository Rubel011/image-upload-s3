const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const multers3 = require('multer-s3');
const multer = require('multer');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/imageUpload");

// Create a mongoose model for Image
const Image = mongoose.model('Image', {
  filename: String,
  path: String
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });

// API endpoint for image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  const { filename, path } = req.file;

  // Save image information to MongoDB
  const image = new Image({ filename, path });
  await image.save();

  res.json({ success: true, message: 'Image uploaded successfully' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
