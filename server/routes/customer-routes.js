const express = require('express');
const CustomerController = require('../controllers/customer-controller');
const router = express.Router();

router.get('/', CustomerController.getCustomer);
router.post('/', CustomerController.createCustomer);

module.exports = router;
