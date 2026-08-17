import express from "express";
import fs from "fs/promises";

import config from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import connectDB from "./config/database.js";

const app = express();

// Use this instead of bodyparser.json()
app.use(express.json());

connectDB();

app.get("/", (request, response) => {
  response.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Welcome to Contact page</h1>");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
