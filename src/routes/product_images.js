// routes/product_images.js
const express = require('express');
const router = express.Router();
const productImageController = require('../controllers/product_images');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', authenticate, isAdmin, productImageController.getAllProductImages);
router.get('/:id', authenticate, isAdmin, productImageController.getProductImage);
router.post('/', authenticate, isAdmin, productImageController.createProductImage);
router.put('/:id', authenticate, isAdmin, productImageController.updateProductImage);
router.delete('/:id', authenticate, isAdmin, productImageController.deleteProductImage);

module.exports = router;