import express from 'express';
// Import your routes at the top with the mandatory .js extension
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();

// Use the imported routes
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes); 


app.listen(3000, () => console.log("Emmys blog running at 3000 check it out"));
