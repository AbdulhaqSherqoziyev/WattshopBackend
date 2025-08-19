// routes/likes.js
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likes');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.get('/', authenticate, isAdmin, likeController.getAllLikes);
router.post('/', authenticate, likeController.createLike);
router.delete('/:id', authenticate, likeController.deleteLike);

module.exports = router;