// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', authenticate, isAdmin, userController.getAllUsers);
router.get('/:id', authenticate, isAdmin, userController.getUser);
router.put('/:id', authenticate, isAdmin, userController.updateUser);
router.delete('/:id', authenticate, isAdmin, userController.deleteUser);

module.exports = router;