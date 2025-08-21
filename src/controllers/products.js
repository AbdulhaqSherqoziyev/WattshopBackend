const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll({ include: 'Category' });
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id, { include: 'Category' });
  if (!product) return res.status(404).json({ msg: 'Product not found' });
  res.json(product);
};

exports.createProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('color').optional(),
  body('description').optional(),
  body('category_id').isInt().withMessage('Category ID is required'),
  body('price').isDecimal().withMessage('Valid price required'),
  body('quantity').isInt().withMessage('Valid quantity required'),
  body('warranty_months').optional().isInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.updateProduct = [
  body('name').optional().notEmpty(),
  body('color').optional(),
  body('description').optional(),
  body('category_id').optional().isInt(),
  body('price').optional().isDecimal(),
  body('quantity').optional().isInt(),
  body('warranty_months').optional().isInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    await product.update(req.body);
    product.updated_at = new Date();
    await product.save();
    res.json(product);
  },
];

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Product not found' });
  await product.destroy();
  res.json({ msg: 'Product deleted' });
};
