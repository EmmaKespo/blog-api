const { PrismaClient } = require('@prisma/client');
const prisma = new prismaClient();

 // GET ALL COMMENTS FOR A SPECIFIC POST
 exports.getCommentByPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await prisma.comments.findMany({
            where: { postId },
            order: { createdAt: 'asc' }, //oldest comment first (normall convention)
        })
        res.json(comments)
    } catch (error) {
        res.status(500).json({ error: "failed to fecth comments"});
    }
 };

 //CREATE A COMMENT
 exports.createComment = async (req, res) => {
       const { postId } = req.params;
       const { content } = req.body;
       try {
        const newComment = await prisma.comments.create({
         data: {
            content,
            postId,
         },
        });
        res.status(201).json(newComment);
       } catch (error) {
        res.status(500).json({ error: "failed to add comment" })
       }
 };
