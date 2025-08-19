// routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', authenticate, isAdmin, orderController.getAllOrders);
router.get('/my', authenticate, orderController.getMyOrders);
router.post('/', authenticate, orderController.createOrder);
router.put('/:id', authenticate, isAdmin, orderController.updateOrder);
router.delete('/:id', authenticate, isAdmin, orderController.deleteOrder);

module.exports = router;