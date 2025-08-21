// routes/carts.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts');
const { authenticate } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         product_id:
 *           type: integer
 *           example: 12
 *         quantity:
 *           type: integer
 *           example: 2
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 3
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T12:34:56.000Z"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *
 * tags:
 *   - name: Carts
 *     description: Cart management APIs
 *
 * /api/carts/my:
 *   get:
 *     summary: Get my cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart with items
 *
 * /api/carts/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id, quantity]
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 12
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Product added to cart
 *
 * /api/carts/item/{id}:
 *   put:
 *     summary: Update quantity of a cart item
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 */

// actual routes (these match the swagger docs above)
router.get('/my', authenticate, cartController.getMyCart);
router.post('/add', authenticate, cartController.addToCart);
router.put('/item/:id', authenticate, cartController.updateCartItem);
router.delete('/item/:id', authenticate, cartController.removeFromCart);

module.exports = router;
