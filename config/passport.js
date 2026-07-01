//configure passport to read json token from visitors header, unpack it, and verify that you are the authour
import { prisma } from '../config/prisma.js';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';


//const passport = require("passport");
//const Jwtstrategy = require("passport-jwt").Strategy;
//const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  // look for the token in the request header labeled "Authorization: Bearer <TOKEN>"
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // secret key used to sign and unlock our tokens. 
  secretOrKey: process.env.JWT_SECRET
}
export default (passport) => {
  //passport to use JWT strategy
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try{
            //look inside the token payload for the author
            const author = await prisma.author.findUnique({
                where: { id: jwt_payload.id },
        });
        // if author exist in our db, pass them forward
        if (author) {
            return done(null, author);
        }
        // if no author mathes token details, deny access
        return done(null, false)
        } catch (error) {
            return done(error, false)
        }
    })
  )
};

