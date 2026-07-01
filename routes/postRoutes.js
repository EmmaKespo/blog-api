import express from 'express';
const router = express.Router();

// You must explicitly add the '.js' extension for local files
import postController from '../controllers/postController.js'; 


// public routes to view posts
router.get('/', postController.getAllPosts); //to fetch posts
 // author routes to manage post
router.post('/:id', postController.createPost); 
router.put('/:id', postController.updatePost);
router.patch('/:id/publish', postController.togglePublish);
router.delete('/:id', postController.deletePost)

export default router;
