// controllers/notifications.js
const { body, validationResult } = require('express-validator');
const Notification = require('../models/Notification');

exports.getAllNotifications = async (req, res) => {
  const notifications = await Notification.findAll();
  res.json(notifications);
};

exports.getMyNotifications = async (req, res) => {
  const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
  res.json(notifications);
};

exports.createNotification = [
  body('user_id').isInt().withMessage('User ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('message').notEmpty().withMessage('Message is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const notification = await Notification.create(req.body);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.updateNotification = [
  body('is_read').optional().isBoolean(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ msg: 'Notification not found' });
    await notification.update(req.body);
    res.json(notification);
  },
];

exports.deleteNotification = async (req, res) => {
  const notification = await Notification.findByPk(req.params.id);
  if (!notification) return res.status(404).json({ msg: 'Notification not found' });
  await notification.destroy();
  res.json({ msg: 'Notification deleted' });
};