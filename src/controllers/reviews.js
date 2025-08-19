// controllers/reviews.js
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.findAll();
  res.json(reviews);
};

exports.getReviewsForProduct = async (req, res) => {
  const reviews = await Review.findAll({ where: { product_id: req.params.productId } });
  res.json(reviews);
};

exports.createReview = [
  body('product_id').isInt().withMessage('Product ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  body('comment').optional(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const review = await Review.create({ user_id: req.user.id, ...req.body });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.updateReview = [
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('comment').optional(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const review = await Review.findByPk(req.params.id);
    if (!review || review.user_id !== req.user.id) return res.status(404).json({ msg: 'Review not found' });
    await review.update(req.body);
    res.json(review);
  },
];

exports.deleteReview = async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review || review.user_id !== req.user.id) return res.status(404).json({ msg: 'Review not found' });
  await review.destroy();
  res.json({ msg: 'Review deleted' });
};