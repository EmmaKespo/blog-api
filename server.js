import express from 'express';
// Import your routes at the top with the mandatory .js extension
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import "dotenv/config";
const app = express();

// 1. Import the actual passport library instance from npm packages
import passport from 'passport';

// 2. Import your configuration file under a unique initializer name
import configurePassport from './config/passport.js'; 

app.use(express.json());
// initialize passport package
app.use(passport.initialize());
// 4. Run your configuration function, passing the live passport instance into it
configurePassport(passport);
//app.use('/api/auth', )

app.use('/api/auth', authRoutes);
// Use the imported routes
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes); 


app.listen(3000, () => console.log("Emmys blog running at 3000 check it out"));
