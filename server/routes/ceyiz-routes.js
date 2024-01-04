const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth-middleware');
const CeyizController = require('../controllers/ceyiz-controller');
const fileUpload = require('../middleware/file-upload');
const checkHata = require('../middleware/check-database');

router.get('/items', protect, checkHata, CeyizController.getItems);
router.get('/items/favourite', protect, checkHata, CeyizController.getFavourites);
router.post('/item', protect, checkHata, fileUpload.array('image', 5), CeyizController.createItem);
router.put('/item/:ceyiz_item_id', protect, checkHata, fileUpload.array('image', 5), CeyizController.updateItem);
router.put('/item/:ceyiz_item_id/status', protect, checkHata, CeyizController.updateStatus);
router.delete('/item/:ceyiz_item_id', protect, checkHata, CeyizController.deleteItem);

module.exports = router;
