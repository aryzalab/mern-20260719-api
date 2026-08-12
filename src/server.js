import express from "express";
import fs from "fs/promises";

import config from "./config/config.js";

const app = express();

app.get("/", (request, response) => {
  response.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Welcome to Contact page</h1>");
});

app.get("/users", async (req, res) => {
  const users = await fs.readFile("data/users.json", "utf-8");

  res.json(JSON.parse(users));
});

// Dynamic route params
app.get("/users/:userId", async (req, res) => {
  const id = req.params.userId;

  const users = await fs.readFile("data/users.json", "utf-8");

  const user = JSON.parse(users).find((user) => user.id == id);

  if (!user) {
    return res.send("User not found.");
  }

  res.json(user);
});

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
