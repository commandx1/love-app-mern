const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth-middleware');
const PoemController = require('../controllers/poem-controller');
const fileUpload = require('../middleware/file-upload');
const checkHata = require('../middleware/check-database');

router.get('/', protect, checkHata, PoemController.getPoems);
router.post('/', protect, checkHata, fileUpload.array(), PoemController.createPoem);
router.put('/:poem_id', protect, checkHata, fileUpload.array(), PoemController.updatePoem);
router.delete('/:poem_id', protect, checkHata, PoemController.deletePoem);

module.exports = router;
