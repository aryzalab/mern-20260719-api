import express from "express";
import fs from "fs/promises";

import config from "./config/config.js";
import usersRoute from "./routes/user.routes.js";
import productsRoute from "./routes/product.routes.js";
import connectDB from "./config/database.js";

const app = express();

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

app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
