// routes/categories.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', categoryController.getAllCategories); // Public
router.get('/:id', categoryController.getCategory); // Public
router.post('/', authenticate, isAdmin, categoryController.createCategory);
router.put('/:id', authenticate, isAdmin, categoryController.updateCategory);
router.delete('/:id', authenticate, isAdmin, categoryController.deleteCategory);

module.exports = router;