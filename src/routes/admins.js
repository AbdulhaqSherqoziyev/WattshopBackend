// routes/admins.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admins');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', authenticate, isAdmin, adminController.getAllAdmins);
router.get('/:id', authenticate, isAdmin, adminController.getAdmin);
router.post('/', authenticate, isAdmin, adminController.createAdmin);
router.put('/:id', authenticate, isAdmin, adminController.updateAdmin);
router.delete('/:id', authenticate, isAdmin, adminController.deleteAdmin);

module.exports = router;