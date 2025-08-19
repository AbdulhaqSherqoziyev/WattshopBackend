// controllers/likes.js
const { body, validationResult } = require('express-validator');
const Like = require('../models/Like');

exports.getAllLikes = async (req, res) => {
  const likes = await Like.findAll();
  res.json(likes);
};

exports.createLike = [
  body('product_id').isInt().withMessage('Product ID is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const like = await Like.create({ user_id: req.user.id, product_id: req.body.product_id });
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.deleteLike = async (req, res) => {
  const like = await Like.findOne({ where: { id: req.params.id, user_id: req.user.id } });
  if (!like) return res.status(404).json({ msg: 'Like not found' });
  await like.destroy();
  res.json({ msg: 'Like deleted' });
};