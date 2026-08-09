console.log("Hello world"); // small task

// const fs = require("fs");
import fs from "fs";
import { square } from "./compute.js";

// blocking task/time consuming task
fs.readFile("data/data.txt", "utf-8", (error, data) => {
  if (error) {
    console.log(error);

    return;
  }

  console.log(data);
});

console.log("File read successfully"); // small task

console.log(square(8));
