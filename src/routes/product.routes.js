import express from "express";
import productControllers from "../controllers/product.controllers.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import validate from "../middlewares/validator.js";
import { productSchema } from "../libs/schemas/product.schema.js";

const router = express.Router();

router.get("/", productControllers.getProducts);

router.get("/brands", productControllers.getBrands);

router.get("/categories", productControllers.getCategories);

router.get("/:id", productControllers.getProductById);

router.post(
  "/",
  auth,
  roleBasedAuth("MERCHANT"),
  validate(productSchema),
  productControllers.createProduct,
);

router.put(
  "/:id",
  auth,
  roleBasedAuth("MERCHANT"),
  productControllers.updateProduct,
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth("MERCHANT"),
  productControllers.deleteProduct,
);

export default router;
