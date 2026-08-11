import fs from "fs";

const fetchUsers = () =>
  new Promise((resolve, reject) => {
    fs.readFile("data/users.json", "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

(async () => {
  const users = await fetchUsers();
  console.log(users);
})();
