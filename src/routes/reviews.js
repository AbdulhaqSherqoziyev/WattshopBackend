// routes/reviews.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', authenticate, isAdmin, reviewController.getAllReviews);
router.get('/product/:productId', reviewController.getReviewsForProduct); // Public
router.post('/', authenticate, reviewController.createReview);
router.put('/:id', authenticate, reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);

module.exports = router;