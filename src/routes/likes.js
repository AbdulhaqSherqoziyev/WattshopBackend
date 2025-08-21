// routes/likes.js
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likes');
const { authenticate, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 5
 *         product_id:
 *           type: integer
 *           example: 12
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T10:30:00Z"
 *
 * tags:
 *   - name: Likes
 *     description: User likes management APIs
 *
 * /api/likes:
 *   get:
 *     summary: Get all likes (admin only)
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all likes
 *   post:
 *     summary: Add a like to a product
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id]
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       201:
 *         description: Like created successfully
 *
 * /api/likes/{id}:
 *   delete:
 *     summary: Remove a like
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the like to delete
 *     responses:
 *       200:
 *         description: Like deleted successfully
 */

// actual routes
router.get('/', authenticate, isAdmin, likeController.getAllLikes);
router.post('/', authenticate, likeController.createLike);
router.delete('/:id', authenticate, likeController.deleteLike);

module.exports = router;
