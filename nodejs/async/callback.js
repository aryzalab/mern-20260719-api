/**
 * Callback: function used as a parameter in another function
 * Higher order function: function that accepts function as a parameter
 *
 * In the given example:
 * test1 => callback function
 * test2 => higher order function
 */

// function test1() {}

// function test2() {}

// test2(test1);

import fs from "fs";

// fs.readFile("data/note.txt", "utf-8", (error, data) => {
//   console.log(data);
// });

// callback hell
fs.readFile("data/users.json", "utf-8", (userError, users) => {
  if (userError) {
    console.log(userError);
  } else {
    console.log(users);

    fs.readFile("data/posts.json", "utf-8", (postError, posts) => {
      if (postError) {
        console.log(postError);
      } else {
        // success
        console.log(posts);

        const userPosts = JSON.parse(users).map((user) => {
          return {
            ...user,
            post: JSON.parse(posts).find((post) => post.userId == user.id),
          };
        });

        console.log(userPosts);

        fs.readFile("data/comments.json", "utf-8", (commentError, comments) => {
          if (commentError) {
            console.log(commentError);
          } else {
            console.log(comments);
          }
        });
      }
    });
  }
});

console.log("hello world");
