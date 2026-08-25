import User from "../models/User.js";
import uploadFiles from "../utils/fileUploader.js";

const getUsers = async () => {
  const users = await User.find();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};

const createUser = async () => {
  return await User.create({
    name: "Rajesh",
    email: "rajesh1@gmail.com",
    password: "123456",
    phone: "9876543210",
    address: {
      city: "Dharan",
    },
  });
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data);
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};

const updateProfileImage = async (id, file) => {
  const uploadedFile = await uploadFiles([file]);

  return User.findByIdAndUpdate(
    id,
    { profileImageUrl: uploadedFile[0].url },
    { new: true },
  );
};

export default {
  getUserById,
  getUsers,
  createUser,
  deleteUser,
  updateProfileImage,
};
