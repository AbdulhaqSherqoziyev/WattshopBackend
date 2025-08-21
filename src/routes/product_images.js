// routes/product_images.js
const express = require('express');
const router = express.Router();
const productImageController = require('../controllers/product_images');
const { authenticate, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductImage:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         product_id:
 *           type: integer
 *           example: 3
 *         image_url:
 *           type: string
 *           example: "https://example.com/images/product1.jpg"
 *
 * tags:
 *   - name: ProductImages
 *     description: Product images management APIs
 *
 * /api/product_images:
 *   get:
 *     summary: Get all product images (admin only)
 *     tags: [ProductImages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all product images
 *
 *   post:
 *     summary: Create a new product image (admin only)
 *     tags: [ProductImages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id, image_url]
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 3
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/images/product-new.jpg"
 *     responses:
 *       201:
 *         description: Product image created successfully
 *
 * /api/product_images/{id}:
 *   get:
 *     summary: Get a product image by ID (admin only)
 *     tags: [ProductImages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product image ID
 *     responses:
 *       200:
 *         description: Product image details
 *
 *   put:
 *     summary: Update a product image (admin only)
 *     tags: [ProductImages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product image ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 5
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/images/product-updated.jpg"
 *     responses:
 *       200:
 *         description: Product image updated successfully
 *
 *   delete:
 *     summary: Delete a product image (admin only)
 *     tags: [ProductImages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product image ID
 *     responses:
 *       200:
 *         description: Product image deleted successfully
 */

// actual routes
router.get('/', authenticate, isAdmin, productImageController.getAllProductImages);
router.get('/:id', authenticate, isAdmin, productImageController.getProductImage);
router.post('/', authenticate, isAdmin, productImageController.createProductImage);
router.put('/:id', authenticate, isAdmin, productImageController.updateProductImage);
router.delete('/:id', authenticate, isAdmin, productImageController.deleteProductImage);

module.exports = router;
