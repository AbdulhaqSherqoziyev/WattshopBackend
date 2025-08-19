// routes/settings.js
const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settings');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', authenticate, isAdmin, settingController.getAllSettings);
router.get('/:id', authenticate, isAdmin, settingController.getSetting);
router.post('/', authenticate, isAdmin, settingController.createSetting);
router.put('/:id', authenticate, isAdmin, settingController.updateSetting);
router.delete('/:id', authenticate, isAdmin, settingController.deleteSetting);

module.exports = router;