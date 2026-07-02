import express from "express";
const router = express.Router()

import authController from "../controllers/authController.js";

// route to create a single author account
router.post('/register', authController.register)

// route to sign in and collect access token
router.post('/login', authController.login)

export default router;