// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', productController.getAllProducts); // Public
router.get('/:id', productController.getProduct); // Public
router.post('/', authenticate, isAdmin, productController.createProduct);
router.put('/:id', authenticate, isAdmin, productController.updateProduct);
router.delete('/:id', authenticate, isAdmin, productController.deleteProduct);

module.exports = router;