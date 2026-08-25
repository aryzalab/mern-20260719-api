import express from "express";
import userController from "../controllers/user.controllers.js";
import validate from "../middlewares/validator.js";
import { userSchema } from "../libs/schemas/user.schema.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), userController.getUsers);

// Dynamic route params
router.get("/:userId", auth, userController.getUserById);

router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  validate(userSchema),
  userController.createUser,
);

router.put("/profile-image", auth, userController.updateProfileImage);

router.put("/:userId", auth, userController.updateUser);

router.delete(
  "/:userId",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  userController.deleteUser,
);

export default router;
