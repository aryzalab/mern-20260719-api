import fs from "fs/promises";

async function fetchData() {
  try {
    const users = await fs.readFile("data/users.json", "utf-8");
    const posts = await fs.readFile("data/posts.json", "utf-8");
    const comments = await fs.readFile("data/comments.json", "utf-8");

    console.log(users);
    console.log(posts);
    console.log(comments);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Final code");
  }
}

fetchData();

const fetchApiData = async () => {
  const rawData = await fetch("https://jsonplaceholder.typicode.com/todos");

  const data = await rawData.json();

  console.log(data);
};

fetchApiData();
