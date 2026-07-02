// register account and logging in
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET;

   // register which is done use 
const register = async (req, res) => {
    const { email, password } = req.body;
    try{
        // check if an author already exists. we only allow one author
        const existingAuthor = await prisma.author.findFirst();
        if (existingAuthor) {
            return res.status(400).json({ error: "Author exist only one author is allowed" })
        }
        // hash password and save it to db 10 is salt round ie how complex the encrption is
        const hashedPassword = await bcrypt.hash(password, 10);
        // create the account inside the db
        const newAuthor = await prisma.author.create({
            data: {
                email,
                password: hashedPassword, // store our password to db
            },
        });
        res.status(201).json({ message: "master author account created succesfully!", authorId: newAuthor.id})
    } catch (error) {
        return res.status(500).json({ error: "failed to create account" })
    }
};
// author login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // search db for email
        const author = await prisma.author.findUnique({ where: { email }});
        if (!author) {
        return res.status(401).json({ error: "invalide email or password combination."})
        }
        // compare the typed password and the hashed password
        const isMatch = await bcrypt.compare(password, author.password);
        if (!isMatch) {
            return res.status(401).json({ error: "invalide email or password combination."})
        }
        //generate a secure token containin your unique db id
        const tokenPayload = { id: author.id, email: author.email };
      // sign the token with our secret key. set to expire in one day
      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1d"});
      // send token to front end
      res.json({
        message: "login successfull welcome back",
        token: 'Bearer ${token}' // standard formating prefic for header
      })
    } catch (error){
        res.status(500).json({ error: "login process failed" });
    }
};
export default {
    register,
    login,
}




