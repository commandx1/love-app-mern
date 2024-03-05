const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth-middleware');
const checkHata = require('../middleware/check-database');
const PlaceController = require('../controllers/place-controller');

router.get('/', protect, checkHata, PlaceController.getPlaces);
router.patch('/', protect, checkHata, PlaceController.updatePlaces);

module.exports = router;
