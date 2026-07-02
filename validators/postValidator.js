import { z } from 'zod';

// define validation rules for creating a post
const createPostSchema = z.object({
  body: z.object({
    title: z.string({
        required_error: 'Title is required',
    }).min(5, 'Title must be at least 5 characters long'),
    content: z.string({
        required_error: 'Content is required',
    }).min(20, 'Content must be at least 20 characters long'),
    authorId: z.string({
        required_error: 'Author ID must be linked to this post',
    }).uuid('Author ID must be a valid UUID'),
  }),
});
// validation for editing a post(optional)
const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters long').optional(),
    content: z.string().min(20, 'Content must be at least 20 characters long').optional(),
  }),
});

export { createPostSchema, updatePostSchema };
