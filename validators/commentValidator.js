import { z } from "zod";

// define validation rules for creating a comment
const createCommentSchema = z.object({
  body: z.object({
    content: z.string({
      required_error: 'Comment is required',
    }).min(2, 'Content must be at least 2 characters long')
    .max(400, 'comments cannot be longer than 400 characters')
  }),
});

export default {
  createCommentSchema,
};