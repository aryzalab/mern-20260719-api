import userServices from "../services/user.services.js";

const getUsers = async (req, res) => {
  const users = await userServices.getUsers();

  res.json(users);
};

const getAuthUser = async (req, res) => {
  const user = await userServices.getUserById(req.user._id);

  if (!user) {
    return res.send("User not found.");
  }

  res.json(user);
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
    const createdUser = await userServices.createUser(req.body);

    res.json(createdUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.userId;
  const input = req.body;

  try {
    const data = await userServices.updateUser(id, {
      name: input.name,
      phone: input.phone,
      address: input.address,
      email: input.email,
      roles: input.roles,
      isActive: input.isActive,
    });

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAuthUser = async (req, res) => {
  const id = req.user._id;
  const input = req.body;

  try {
    const data = await userServices.updateUser(id, {
      name: input.name,
      phone: input.phone,
      address: input.address,
      email: input.email,
    });

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  const id = req.params.userId;
  const input = req.body;

  try {
    const data = await userServices.updatePassword(id, req.body);

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAuthUserPassword = async (req, res) => {
  const id = req.user._id;
  const input = req.body;

  try {
    const data = await userServices.updateAuthUserPassword(id, req.body);

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
      message: `User deleted for id: ${id}`,
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
  getAuthUser,
  getUserById,
  updatePassword,
  createUser,
  updateAuthUser,
  deleteUser,
  updateProfileImage,
  updateUser,
  updateAuthUserPassword,
};
