// routes/deliveries.js
const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveries');
const { authenticate, isAdmin, isDeliveryman } = require('../middlewares/auth');

// Admin can view all, deliveryman can update their own
router.get('/', authenticate, isAdmin, deliveryController.getAllDeliveries);
router.get('/:id', authenticate, isAdmin, deliveryController.getDelivery);
router.post('/', authenticate, isAdmin, deliveryController.createDelivery);
router.put('/:id', authenticate, isDeliveryman, deliveryController.updateDelivery);
router.delete('/:id', authenticate, isAdmin, deliveryController.deleteDelivery);

module.exports = router;