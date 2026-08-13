import userServices from "../services/user.services.js";

const getUsers = async (req, res) => {
  const users = await userServices.getUsers();

  res.json(JSON.parse(users));
};

const getUserById = async (req, res) => {
  const id = req.params.userId;

  const user = await userServices.getUserById(id);

  if (!user) {
    return res.send("User not found.");
  }

  res.json(user);
};

export default { getUsers, getUserById };
