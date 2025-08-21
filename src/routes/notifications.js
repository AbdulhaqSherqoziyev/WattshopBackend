// routes/notifications.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notifications');
const { authenticate, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 5
 *         title:
 *           type: string
 *           example: "Order Shipped"
 *         message:
 *           type: string
 *           example: "Your order #123 has been shipped!"
 *         is_read:
 *           type: boolean
 *           example: false
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T10:30:00Z"
 *
 * tags:
 *   - name: Notifications
 *     description: Notifications management APIs
 *
 * /api/notifications:
 *   get:
 *     summary: Get all notifications (admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all notifications
 *
 *   post:
 *     summary: Create a notification (admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, title, message]
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 5
 *               title:
 *                 type: string
 *                 example: "Order Delivered"
 *               message:
 *                 type: string
 *                 example: "Your order #123 has been delivered successfully."
 *     responses:
 *       201:
 *         description: Notification created successfully
 *
 * /api/notifications/my:
 *   get:
 *     summary: Get my notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the logged-in user's notifications
 *
 * /api/notifications/{id}:
 *   put:
 *     summary: Mark a notification as read / update it
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the notification
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_read:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *
 *   delete:
 *     summary: Delete a notification (admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the notification to delete
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 */

// actual routes
router.get('/', authenticate, isAdmin, notificationController.getAllNotifications);
router.get('/my', authenticate, notificationController.getMyNotifications);
router.post('/', authenticate, isAdmin, notificationController.createNotification);
router.put('/:id', authenticate, notificationController.updateNotification); // user can mark as read
router.delete('/:id', authenticate, isAdmin, notificationController.deleteNotification);

module.exports = router;
