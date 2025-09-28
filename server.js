// Projects1\househunt-server\server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v2: cloudinary } = require('cloudinary');

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Existing endpoint for deleting images
app.post('/delete-image', async (req, res) => {
  const { publicId } = req.body;
  console.log('Received delete request for image publicId:', publicId);
  
  if (!publicId) return res.status(400).json({ error: 'publicId required' });
  
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image'  // Explicitly specify image
    });
    console.log('Image deletion result:', result);
    res.json(result);
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: err.message });
  }
});

// NEW endpoint for deleting videos
app.post('/delete-video', async (req, res) => {
  const { publicId } = req.body;
  console.log('Received delete request for video publicId:', publicId);
  
  if (!publicId) return res.status(400).json({ error: 'publicId required' });
  
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video'  // Specify video resource type
    });
    console.log('Video deletion result:', result);
    res.json(result);
  } catch (err) {
    console.error('Error deleting video:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Cloudinary delete server running on port ${PORT}`));