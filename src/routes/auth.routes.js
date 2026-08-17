import express from "express";
import authControllers from "../controllers/auth.controllers.js";

const router = express.Router();

/**
 * Login
 * URL: /api/auth/login
 * HTTP Method: POST
 */

router.post("/login", authControllers.login);

/**
 * Register
 * URL: /api/auth/register
 * HTTP Method: POST
 */

router.post("/register", authControllers.register);

export default router;
