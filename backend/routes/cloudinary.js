const express = require('express');
const cloudinary = require('cloudinary').v2;
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const isConfigured = () =>
  !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

router.get('/config', requireAuth, (req, res) => {
  res.json({ configured: isConfigured(), cloudName: process.env.CLOUDINARY_CLOUD_NAME || null });
});

// Generate signed upload params (authenticated users only)
router.get('/signature', requireAuth, (req, res) => {
  if (!isConfigured())
    return res.status(503).json({ message: "Cloudinary n'est pas configuré côté serveur" });

  const allowedFolders = ['ulpgl/articles', 'ulpgl/events', 'ulpgl/activities', 'ulpgl/avatars', 'ulpgl/uploads'];
  let folder = req.query.folder || 'ulpgl/uploads';
  if (!allowedFolders.includes(folder)) folder = 'ulpgl/uploads';

  const timestamp = Math.round(Date.now() / 1000);
  const params = { timestamp, folder };
  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);

  res.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
  });
});

module.exports = router;
