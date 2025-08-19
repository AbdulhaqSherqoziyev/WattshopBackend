// middlewares/auth.js
const jwt = require('jsonwebtoken');
const { accessSecret } = require('../config/jwt');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, accessSecret, (err, user) => {
    if (err) return res.status(403).json({ msg: 'Invalid token' });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied: Admin only' });
  next();
};

const isDeliveryman = (req, res, next) => {
  if (req.user.role !== 'deliveryman') return res.status(403).json({ msg: 'Access denied: Deliveryman only' });
  next();
};

module.exports = { authenticate, isAdmin, isDeliveryman };