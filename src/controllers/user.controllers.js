import userServices from "../services/user.services.js";

const getUsers = async (req, res) => {
  const users = await userServices.getUsers();

  res.json(users);
};

const getUserById = async (req, res) => {
  const id = req.params.userId;

  const user = await userServices.getUserById(id);

  if (!user) {
    return res.send("User not found.");
  }

  res.json(user);
};

const createUser = async (req, res) => {
  try {
    const createdUser = await userServices.createUser();

    res.json(createdUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.userId;

  try {
    const data = await userServices.updateUser(id, req.body);

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;

  try {
    await userServices.deleteUser(id);

    res.json({
      message: `User deleted. id: ${id}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const data = await userServices.updateProfileImage(req.user._id, req.file);

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateProfileImage,
  updateUser,
};
