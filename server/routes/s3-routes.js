const express = require('express');
const router = express.Router();
const S3Controller = require('../controllers/s3-controller');
const { protect } = require('../middleware/auth-middleware');

router.get('/new', protect, S3Controller.uploadImage);
router.delete('/:s3Key', protect, S3Controller.deleteImage);

module.exports = router;
