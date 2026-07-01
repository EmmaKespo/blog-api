import express from "express";
const router = new express()

import authController from "../controllers/authController";

// route to create a single author account
router.post('/register', authController.register)

// route to sign in and collect access token
router.post('/login', authController.login)

export default router;