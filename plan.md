No reader account
dedicated author model
anonymous comments
GET /posts -> viewers seee all published post
POST /posts -> you create a new post
PUT /posts/:id edit tittle or content of post
POST /:postid/comment viewers can post comment
PATCH /posts/:id/publish toogle post btw publish and unpublish
DELETE /post/:id delete post which also delete comment
// what  viewers can do
GET post/:id/comments - fethes and display dated comment for a published post
POST post/:id/comments - allows viewers to type and submit new comment 

config/passport.js  passport to read jwt
middleware/authmiddleware.js  verification checkpoint for routes blocking invalid passport
controller/authController register account using hash password and log in using generated JWT token

validators/postValidator ensures you dont save an empty blog post
validators/commentValidator.js blogs empty comment

