// routes/deliveries.js
const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveries');
const { authenticate, isAdmin, isDeliveryman } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 12
 *         order_id:
 *           type: integer
 *           example: 101
 *         delivery_status:
 *           type: string
 *           example: "pending"
 *         vehicle_number:
 *           type: string
 *           example: "ABC-1234"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-20T12:34:56Z"
 *
 * tags:
 *   - name: Deliveries
 *     description: Manage delivery assignments and statuses
 *
 * /api/deliveries:
 *   get:
 *     summary: Get all deliveries (admin only)
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all deliveries
 *
 *   post:
 *     summary: Create a new delivery (admin only)
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [order_id, vehicle_number]
 *             properties:
 *               order_id:
 *                 type: integer
 *                 example: 101
 *               vehicle_number:
 *                 type: string
 *                 example: "XYZ-9876"
 *     responses:
 *       201:
 *         description: Delivery created successfully
 *
 * /api/deliveries/{id}:
 *   get:
 *     summary: Get a specific delivery (admin only)
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery details
 *
 *   put:
 *     summary: Update a delivery (deliveryman only)
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               delivery_status:
 *                 type: string
 *                 example: "in_transit"
 *               vehicle_number:
 *                 type: string
 *                 example: "LMN-4567"
 *     responses:
 *       200:
 *         description: Delivery updated successfully
 *
 *   delete:
 *     summary: Delete a delivery (admin only)
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery deleted successfully
 */

// actual routes
router.get('/', authenticate, isAdmin, deliveryController.getAllDeliveries);
router.get('/:id', authenticate, isAdmin, deliveryController.getDelivery);
router.post('/', authenticate, isAdmin, deliveryController.createDelivery);
router.put('/:id', authenticate, isDeliveryman, deliveryController.updateDelivery);
router.delete('/:id', authenticate, isAdmin, deliveryController.deleteDelivery);

module.exports = router;
