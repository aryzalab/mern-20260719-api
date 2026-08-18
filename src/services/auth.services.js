import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async (input) => {
  const user = await User.findOne({
    $or: [{ email: input?.email }, { phone: input?.phone }],
  });

  if (!user) {
    throw {
      message: "User not found.",
    };
  }

  const isPasswordMatch = await bcrypt.compare(input.password, user.password);

  if (!isPasswordMatch) {
    throw {
      message: "Invalid credentials.",
    };
  }

  return {
    _id: user._id,
    name: user.name,
    address: user.address,
    phone: user.phone,
    email: user.email,
    roles: user.roles,
  };
};

const register = async (input) => {
  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    address: input.address,
    phone: input.phone,
  });

  return {
    _id: user._id,
    name: user.name,
    address: user.address,
    phone: user.phone,
    email: user.email,
    roles: user.roles,
  };
};

export default { login, register };
