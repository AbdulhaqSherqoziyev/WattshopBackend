// routes/admins.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admins');
const { authenticate, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 12
 *         role:
 *           type: string
 *           example: "superadmin"
 *         permissions:
 *           type: string
 *           example: "['CREATE_USER','DELETE_USER']"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T12:34:56.000Z"
 *
 * tags:
 *   - name: Admins
 *     description: Admin management APIs
 *
 * /api/admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all admins
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, role]
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 12
 *               role:
 *                 type: string
 *                 example: "moderator"
 *               permissions:
 *                 type: string
 *                 example: "['VIEW_REPORTS','UPDATE_PRODUCT']"
 *     responses:
 *       201:
 *         description: Admin created successfully
 *
 * /api/admins/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Admin details
 *   put:
 *     summary: Update admin by ID
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: "editor"
 *               permissions:
 *                 type: string
 *                 example: "['UPDATE_PRODUCT']"
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *   delete:
 *     summary: Delete admin by ID
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 */

// actual routes (these URLs match the swagger above)
router.get('/', authenticate, isAdmin, adminController.getAllAdmins);
router.get('/:id', authenticate, isAdmin, adminController.getAdmin);
router.post('/', authenticate, isAdmin, adminController.createAdmin);
router.put('/:id', authenticate, isAdmin, adminController.updateAdmin);
router.delete('/:id', authenticate, isAdmin, adminController.deleteAdmin);

module.exports = router;
