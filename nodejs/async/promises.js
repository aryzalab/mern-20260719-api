// Promise => Future value
// Pending - Resolved, Reject, Finally

import fs from "fs/promises";

fs.readFile("data/users.json", "utf-8")
  // resolved (success)
  .then((users) => {
    console.log(users);

    return fs.readFile("data/posts.json", "utf-8");
  })
  .then((posts) => {
    console.log(posts);

    return fs.readFile("data/comments.json", "utf-8");
  })
  .then((comments) => console.log(comments))
  // reject (error)
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Finally");
  });
