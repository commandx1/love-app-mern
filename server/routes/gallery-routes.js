const express = require('express');
const router = express.Router();
const GalleryController = require('../controllers/gallery-controller');
const { protect } = require('../middleware/auth-middleware');
const fileUpload = require('../middleware/file-upload');

router.post('/', protect, fileUpload.single('image'), GalleryController.createImage);
router.get('/', protect, GalleryController.getImages);

module.exports = router;
