import fs from "fs/promises";

const getUsers = async () => {
  const users = await fs.readFile("data/users.json", "utf-8");

  return users;
};

const getUserById = async (id) => {
  const users = await fs.readFile("data/users.json", "utf-8");

  const user = JSON.parse(users).find((user) => user.id == id);

  return user;
};

export default { getUserById, getUsers };
