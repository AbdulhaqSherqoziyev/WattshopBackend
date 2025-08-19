// routes/carts.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts');
const { authenticate } = require('../middlewares/auth');

router.get('/my', authenticate, cartController.getMyCart);
router.post('/add', authenticate, cartController.addToCart);
router.put('/item/:id', authenticate, cartController.updateCartItem);
router.delete('/item/:id', authenticate, cartController.removeFromCart);

module.exports = router;