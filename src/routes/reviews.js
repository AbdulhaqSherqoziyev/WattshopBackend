// routes/reviews.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const { authenticate, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 15
 *         user_id:
 *           type: integer
 *           example: 2
 *         product_id:
 *           type: integer
 *           example: 5
 *         rating:
 *           type: integer
 *           example: 4
 *         comment:
 *           type: string
 *           example: "Great product, works as expected!"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-20T12:34:56Z"
 *
 * tags:
 *   - name: Reviews
 *     description: Product reviews management APIs
 *
 * /api/reviews:
 *   get:
 *     summary: Get all reviews (admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all reviews
 *
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id, rating, comment]
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 5
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Excellent product! Highly recommend."
 *     responses:
 *       201:
 *         description: Review created successfully
 *
 * /api/reviews/product/{productId}:
 *   get:
 *     summary: Get all reviews for a specific product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of product reviews
 *
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 3
 *               comment:
 *                 type: string
 *                 example: "Good product, but shipping was slow."
 *     responses:
 *       200:
 *         description: Review updated successfully
 *
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 */

// actual routes
router.get('/', authenticate, isAdmin, reviewController.getAllReviews);
router.get('/product/:productId', reviewController.getReviewsForProduct); // Public
router.post('/', authenticate, reviewController.createReview);
router.put('/:id', authenticate, reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);

module.exports = router;
