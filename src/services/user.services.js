import User from "../models/User.js";
import uploadFiles from "../utils/fileUploader.js";
import bcrypt from "bcrypt";

const getUsers = async () => {
  const users = await User.find();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
    roles: user.roles,
    isActive: user.isActive,
    createdAt: user.createdAt,
    phone: user.phone,
  };
};

const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await User.create({ ...data, password: hashedPassword });
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

const updatePassword = async (id, data) => {
  if (!data || !data.password) {
    throw {
      message: "Password is required.",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { returnDocument: "after" },
  );
};

const updateAuthUserPassword = async (id, data) => {
  const user = await User.findById(id);

  const isPasswordMatch = await bcrypt.compare(
    data.currentPassword,
    user.password,
  );

  if (!isPasswordMatch) {
    throw {
      message: "Incorrect password.",
    };
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 10);

  return await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { returnDocument: "after" },
  );
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};

const updateProfileImage = async (id, file) => {
  const uploadedFile = await uploadFiles([file]);

  return User.findByIdAndUpdate(
    id,
    { profileImageUrl: uploadedFile[0].url },
    { returnDocument: "after" },
  );
};

export default {
  getUserById,
  getUsers,
  updateAuthUserPassword,
  createUser,
  deleteUser,
  updateUser,
  updatePassword,
  updateProfileImage,
};
