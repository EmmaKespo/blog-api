const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// public routes to view posts
router.get('/', postController.getAllPosts); //to fetch posts
 // author routes to manage post
router.post('/:id', postController.createPost); 
router.put('/:id', postController.updatepost);
router.patch('/:id/publish', postController.togglePublish);
router.delete('/:id', postController.deletePost)

module.exports = router;
