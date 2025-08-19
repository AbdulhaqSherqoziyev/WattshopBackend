// controllers/product_images.js
const { body, validationResult } = require('express-validator');
const ProductImage = require('../models/ProductImage');

exports.getAllProductImages = async (req, res) => {
  const images = await ProductImage.findAll();
  res.json(images);
};

exports.getProductImage = async (req, res) => {
  const image = await ProductImage.findByPk(req.params.id);
  if (!image) return res.status(404).json({ msg: 'Image not found' });
  res.json(image);
};

exports.createProductImage = [
  body('product_id').isInt().withMessage('Product ID is required'),
  body('image_url').notEmpty().withMessage('Image URL is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const image = await ProductImage.create(req.body);
      res.status(201).json(image);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.updateProductImage = [
  body('image_url').optional().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const image = await ProductImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ msg: 'Image not found' });
    await image.update(req.body);
    res.json(image);
  },
];

exports.deleteProductImage = async (req, res) => {
  const image = await ProductImage.findByPk(req.params.id);
  if (!image) return res.status(404).json({ msg: 'Image not found' });
  await image.destroy();
  res.json({ msg: 'Image deleted' });
};