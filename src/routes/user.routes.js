import express from "express";
import userController from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/users", userController.getUsers);

// Dynamic route params
router.get("/users/:userId", userController.getUserById);

export default router;
