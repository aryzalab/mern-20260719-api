import express from "express";
import productControllers from "../controllers/product.controllers.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.get("/", productControllers.getProducts);

router.post(
  "/",
  auth,
  roleBasedAuth("MERCHANT"),
  productControllers.createProduct,
);

export default router;
