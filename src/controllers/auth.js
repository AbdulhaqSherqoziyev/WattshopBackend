// controllers/auth.js
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { accessSecret, refreshSecret } = require('../config/jwt');

exports.register = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').notEmpty().isMobilePhone().withMessage('Valid phone is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['customer', 'admin', 'deliveryman']).withMessage('Invalid role'),
  body('location').optional(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, phone, password, role = 'customer', location } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ name, phone, password: hashedPassword, role, location });
      res.status(201).json(user);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ msg: 'Phone already exists' });
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.login = [
  body('phone').notEmpty().withMessage('Phone is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { phone, password } = req.body;
    const user = await User.findOne({ where: { phone } });
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Invalid credentials' });
    const accessToken = jwt.sign({ id: user.id, role: user.role }, accessSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, role: user.role }, refreshSecret, { expiresIn: '7d' });
    res.json({ accessToken, refreshToken });
  },
];

exports.refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ msg: 'No refresh token provided' });
  jwt.verify(refreshToken, refreshSecret, (err, user) => {
    if (err) return res.status(403).json({ msg: 'Invalid refresh token' });
    const accessToken = jwt.sign({ id: user.id, role: user.role }, accessSecret, { expiresIn: '15m' });
    res.json({ accessToken });
  });
};