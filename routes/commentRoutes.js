import express from 'express';
const router = express.Router();

// You must explicitly add the '.js' extension for local files
import commentController from '../controllers/commentController.js'; 
import validate from '../middleware/validateMiddleware.js';
import { createCommentSchema } from '../validators/commentValidator.js';


// Routes are scoped relative to a specific post
router.get('/:postId/comments', commentController.getCommentByPost)
router.post('/:postId/comments', validate(createCommentSchema), commentController.createComment)
export default router;
