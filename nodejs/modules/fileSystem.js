import fs from "fs";

// Synchronous: Blocking operation
// Asynchronous: Non-blocking operation

// Read
// const result = fs.readFileSync("data/note.txt", "utf8"); // synchronous

// console.log(result);

// console.log("File read successfully.");

// const image = fs.readFileSync("data/image.jpg", "base64"); // synchronous

// console.log(image);

// async
// fs.readFile("data/note.txt", "utf8", (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// });

// console.log("File read twice");

// Write

// fs.writeFileSync("data/note.txt", "This is newly written data sync.");
// fs.writeFile(
//   "data/note.txt",
//   "This is newly written data async.",
//   (error, data) => {
//     console.log("File written success.");
//   },
// );

// Update

// fs.appendFile("data/note.txt", "This is appended text async.", () => {});

// fs.appendFileSync("data/note.txt", "This is appended text sync.");

// fs.appendFileSync(
//   "data/users.json",
//   JSON.stringify([{ name: "Ram" }, { name: "Hari" }, { name: "Sita" }]),
// );

// Delete

fs.rm("data/users.json");
fs.rmSync("data/users.json");
