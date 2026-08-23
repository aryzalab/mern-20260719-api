import express from "express";
import authControllers from "../controllers/auth.controllers.js";
import validate from "../middlewares/validator.js";
import { loginSchema, registerSchema } from "../libs/schemas/auth.schema.js";

const router = express.Router();

/**
 * Login
 * URL: /api/auth/login
 * HTTP Method: POST
 */

router.post("/login", validate(loginSchema), authControllers.login);

/**
 * Register
 * URL: /api/auth/register
 * HTTP Method: POST
 */

router.post("/register", validate(registerSchema), authControllers.register);

router.post("/logout", authControllers.logout);

export default router;
