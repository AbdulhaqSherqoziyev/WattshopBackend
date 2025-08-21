// routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');
const { authenticate, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 101
 *         user_id:
 *           type: integer
 *           example: 5
 *         total_price:
 *           type: number
 *           format: decimal
 *           example: 199.99
 *         payment_status:
 *           type: string
 *           example: "pending"
 *         delivery_type:
 *           type: string
 *           example: "courier"
 *         delivery_address:
 *           type: string
 *           example: "123 Main St, Springfield"
 *         status:
 *           type: string
 *           example: "processing"
 *         comment:
 *           type: string
 *           example: "Please deliver between 5-6 PM"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T10:30:00Z"
 *
 * tags:
 *   - name: Orders
 *     description: Orders management APIs
 *
 * /api/orders:
 *   get:
 *     summary: Get all orders (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [total_price, delivery_type, delivery_address]
 *             properties:
 *               total_price:
 *                 type: number
 *                 example: 149.99
 *               delivery_type:
 *                 type: string
 *                 example: "pickup"
 *               delivery_address:
 *                 type: string
 *                 example: "456 Elm St, Metropolis"
 *               comment:
 *                 type: string
 *                 example: "Leave at the reception"
 *     responses:
 *       201:
 *         description: Order created successfully
 *
 * /api/orders/my:
 *   get:
 *     summary: Get my orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the logged-in user's orders
 *
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_status:
 *                 type: string
 *                 example: "paid"
 *               status:
 *                 type: string
 *                 example: "shipped"
 *               delivery_type:
 *                 type: string
 *                 example: "courier"
 *               delivery_address:
 *                 type: string
 *                 example: "789 Oak St, Gotham"
 *               comment:
 *                 type: string
 *                 example: "Deliver to neighbor if not home"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *
 *   delete:
 *     summary: Delete an order (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */

// actual routes
router.get('/', authenticate, isAdmin, orderController.getAllOrders);
router.get('/my', authenticate, orderController.getMyOrders);
router.post('/', authenticate, orderController.createOrder);
router.put('/:id', authenticate, isAdmin, orderController.updateOrder);
router.delete('/:id', authenticate, isAdmin, orderController.deleteOrder);

module.exports = router;
