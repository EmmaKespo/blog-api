const { prismaClient } = require('@prisma/client');
const prisma = new prismaClient();

// GET ALL POST
// viewers see only published post
exports.getPosts = async (req, res) => {
    try {
        const post = await prisma.post.findMany({
            where: { published: true },
            order: { createdAt: 'desc' }, //newest posts first
        });
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: "failed to fetch post" })
    }   
};
 // CREATE A NEW POST (starts as draft)
exports.createPost = async (req, res) => {
    const { title, content, authorId } = req.body
    try {
        const newPost = await prisma.post.create({
         data: {
            title,
            content,
            authorId,
            published: false, // default as draft
         },
    });
    res.status(201).json(newPost)
} catch (error) {
    res.status(500).json({ error: "failed to create post" });
}
};
// EDIT A POST
exports.updatepost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content },
        })
        res.json(updatedPost)
    }  catch (error) {
    res.status(500).json({ error: "failed to update post" });
}   
};
 // PUBLISH / UNPUBLISH A POST (toggle)
 exports.togglePublish = async (req, res) => {
    const { id } = req.params;
    const { published } = req.body; // pass true or false
   try {
    const updatedPost = await prisma.post.update({
        where: { id },
        data: { published },
    })
    res.json(updatedPost)
   }  catch (error) {
    res.status(500).json({ error: "failed to change publish status" });
}   
 };
 // DELETE POST
 exports.deletePost = async (req, res) => {
    const { id } = req.params,
    try {
         await prisma.post.delete({
            where: { id },
        })
        res.json({ message: "post and comment successfully deleted"});
    }  catch (error) {
    res.status(500).json({ error: "failed to delete post" });
}     
 }



