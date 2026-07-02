import express from 'express';
const router = express.Router();
import postController from '../controllers/postController.js';
import requireAuth from '../middleware/authMiddleware.js'; 
import validate from '../middleware/validateMiddleware.js';
import { createPostSchema, updatePostSchema } from '../validation/postValidation.js';



// public routes to view all posts
router.get('/',  postController.getAllPosts); //to fetch all posts
 // author routes to manage post
 // these routes require authentication and validation
router.post('/:id', requireAuth, validate(createPostSchema), postController.createPost); 
// update, publish, and delete before validate the data routes for posts
router.put('/:id', requireAuth, validate(updatePostSchema), postController.updatePost);
router.patch('/:id/publish', requireAuth, postController.togglePublish);
router.delete('/:id', requireAuth, postController.deletePost)

export default router;
