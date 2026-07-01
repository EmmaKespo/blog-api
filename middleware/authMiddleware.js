//blocks invalid passport for routes
import { session } from "passport";
import passport from "../config/passport";
// this middlware intercept request to secure routes

const requireAuth = (req, res, next) => {
    // passport.authenticate to check the jwt strategy
    // session false because api rely on token session
    passport.authenticate('jwt', { session: false }, (err, author, info) => {
        // if there is a system error or no valid author is been returned by passport
        if (err || !author) {
            return res.status(401).json({ error: "unauthorized! only the blog author can perform this action" })
        }
        // attach verified author object so controller can use there ID
        req.user = author;
        // move  next to the controller
        next()
    }

    )(req,res, next);
};

export default requireAuth;