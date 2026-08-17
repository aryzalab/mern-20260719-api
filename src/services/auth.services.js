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

  return user;
};

const register = async (input) => {
  const hashedPassword = await bcrypt.hash(input.password, 10);

  return await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    address: input.address,
    phone: input.phone,
  });
};

export default { login, register };
