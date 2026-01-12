const express = require('express');
const router = express.Router();
const productController = require('./product-controller');
const productValidation = require('./product-validation');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

module.exports = router;

