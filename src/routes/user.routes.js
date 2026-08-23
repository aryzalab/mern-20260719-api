import express from "express";
import userController from "../controllers/user.controllers.js";
import validate from "../middlewares/validator.js";
import { userSchema } from "../libs/schemas/user.schema.js";

const router = express.Router();

router.get("/", userController.getUsers);

// Dynamic route params
router.get("/:userId", userController.getUserById);

router.post("/", validate(userSchema), userController.createUser);

router.delete("/:userId", userController.deleteUser);

export default router;
