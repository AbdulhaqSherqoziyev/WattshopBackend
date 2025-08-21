// routes/settings.js
const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settings');
const { authenticate, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Setting:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3
 *         key:
 *           type: string
 *           example: "site_name"
 *         value:
 *           type: string
 *           example: "My E-Commerce Platform"
 *
 * tags:
 *   - name: Settings
 *     description: Manage application settings (admin only)
 *
 * /api/settings:
 *   get:
 *     summary: Get all settings (admin only)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all settings
 *
 *   post:
 *     summary: Create a new setting (admin only)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [key, value]
 *             properties:
 *               key:
 *                 type: string
 *                 example: "maintenance_mode"
 *               value:
 *                 type: string
 *                 example: "off"
 *     responses:
 *       201:
 *         description: Setting created successfully
 *
 * /api/settings/{id}:
 *   get:
 *     summary: Get a specific setting (admin only)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Setting ID
 *     responses:
 *       200:
 *         description: Setting details
 *
 *   put:
 *     summary: Update a setting (admin only)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Setting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: "site_name"
 *               value:
 *                 type: string
 *                 example: "New E-Commerce Title"
 *     responses:
 *       200:
 *         description: Setting updated successfully
 *
 *   delete:
 *     summary: Delete a setting (admin only)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Setting ID
 *     responses:
 *       200:
 *         description: Setting deleted successfully
 */

// actual routes
router.get('/', authenticate, isAdmin, settingController.getAllSettings);
router.get('/:id', authenticate, isAdmin, settingController.getSetting);
router.post('/', authenticate, isAdmin, settingController.createSetting);
router.put('/:id', authenticate, isAdmin, settingController.updateSetting);
router.delete('/:id', authenticate, isAdmin, settingController.deleteSetting);

module.exports = router;
