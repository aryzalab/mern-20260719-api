import express from "express";
import userController from "../controllers/user.controllers.js";
import validate from "../middlewares/validator.js";
import {
  updatePasswordSchema,
  userSchema,
} from "../libs/schemas/user.schema.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), userController.getUsers);

router.get("/me", auth, userController.getAuthUser);

// Dynamic route params
router.get(
  "/:userId",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  userController.getUserById,
);

router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  validate(userSchema),
  userController.createUser,
);

router.put("/profile-image", auth, userController.updateProfileImage);

router.put("/me", auth, userController.updateAuthUser);

router.put(
  "/:userId",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  userController.updateUser,
);

router.put(
  "/me/change-password",
  auth,
  validate(updatePasswordSchema),
  userController.updateAuthUserPassword,
);

router.put(
  "/:userId/change-password",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  userController.updatePassword,
);

router.delete(
  "/:userId",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  userController.deleteUser,
);

export default router;
