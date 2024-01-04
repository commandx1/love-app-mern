const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth-middleware');
const MemoryController = require('../controllers/memory-controller');
const fileUpload = require('../middleware/file-upload');
const checkHata = require('../middleware/check-database');

router.get('/', protect, checkHata, MemoryController.getMemories);
router.post('/', protect, checkHata, fileUpload.array('image', 5), MemoryController.createMemory);
router.put('/:memory_id', protect, checkHata, fileUpload.array('image', 5), MemoryController.updateMemory);
router.delete('/:memory_id', protect, checkHata, MemoryController.deleteMemory);

module.exports = router;
