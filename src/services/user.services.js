import User from "../models/User.js";

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

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};

export default { getUserById, getUsers, createUser, deleteUser };
