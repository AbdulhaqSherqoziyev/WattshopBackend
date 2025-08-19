// controllers/categories.js
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.findAll({ include: ['Parent', 'Children'] });
  res.json(categories);
};

exports.getCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id, { include: ['Parent', 'Children'] });
  if (!category) return res.status(404).json({ msg: 'Category not found' });
  res.json(category);
};

exports.createCategory = [
  body('name').notEmpty().withMessage('Name is required'),
  body('parent_id').optional().isInt().withMessage('Valid parent ID required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.updateCategory = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('parent_id').optional().isInt().withMessage('Valid parent ID required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Category not found' });
    await category.update(req.body);
    res.json(category);
  },
];

exports.deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ msg: 'Category not found' });
  await category.destroy();
  res.json({ msg: 'Category deleted' });
};