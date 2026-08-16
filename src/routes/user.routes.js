import express from "express";
import userController from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/", userController.getUsers);

// Dynamic route params
router.get("/:userId", userController.getUserById);

router.post("/", userController.createUser);

router.delete("/:userId", userController.deleteUser);

export default router;
