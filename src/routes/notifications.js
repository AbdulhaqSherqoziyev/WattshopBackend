// routes/notifications.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notifications');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', authenticate, isAdmin, notificationController.getAllNotifications);
router.get('/my', authenticate, notificationController.getMyNotifications);
router.post('/', authenticate, isAdmin, notificationController.createNotification);
router.put('/:id', authenticate, notificationController.updateNotification); // User can mark as read
router.delete('/:id', authenticate, isAdmin, notificationController.deleteNotification);

module.exports = router;