import express from "express";
import fs from "fs/promises";
import multer from "multer";

import config from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5000000 }, // 5MB file size
});

// Use this instead of bodyparser.json()
app.use(express.json());

app.use(logger);

connectDB();

connectCloudinary();

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    name: "mern-20260719-api",
    version: "0.1.0",
    port: config.port,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", upload.single("image"), userRoutes);
app.use("/api/products", upload.array("images", 5), productRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
