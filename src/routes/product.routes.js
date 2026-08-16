import express from "express";
import productControllers from "../controllers/product.controllers.js";

const router = express.Router();

router.post("/", productControllers.createProduct);

export default router;
