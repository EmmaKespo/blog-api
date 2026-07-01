import express from 'express';
const router = express.Router();
import requireAuth from '../middleware/authMiddleware.js';

import postController from '../controllers/postController.js'; 


// public routes to view posts
router.get('/',  postController.getAllPosts); //to fetch posts
 // author routes to manage post
router.post('/:id', requireAuth, postController.createPost); 
router.put('/:id', requireAuth, postController.updatePost);
router.patch('/:id/publish', requireAuth, postController.togglePublish);
router.delete('/:id', requireAuth, postController.deletePost)

export default router;
