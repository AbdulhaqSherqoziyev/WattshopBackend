// controllers/users.js
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
};

exports.updateUser = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone is required'),
  body('location').optional(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    await user.update(req.body);
    res.json(user);
  },
];

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  await user.destroy();
  res.json({ msg: 'User deleted' });
};