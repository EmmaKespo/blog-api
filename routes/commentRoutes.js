const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')

// Routes are scoped relative to a specific post
router.get('/:postId/comments', commentController.getCommentByPost)
router.post('/postId/comments', commentController.createComment)
module.exports = router;
