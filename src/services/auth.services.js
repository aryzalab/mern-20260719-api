import config from "../config/config.js";
import ResetPassword from "../models/ResetPassword.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/email.js";

const login = async (input) => {
  const user = await User.findOne({
    $or: [{ email: input?.email }, { phone: input?.phone }],
  });

  if (!user) {
    throw {
      message: "User not found.",
    };
  }

  if (!user.isActive) {
    throw {
      statusCode: 403,
      message: "User disabled.",
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
    isActive: user.isActive,
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

const forgotPassword = async (data) => {
  const user = await User.findOne({
    email: data?.email,
  });

  if (!user) {
    throw {
      statusCode: 404,
      message: "User not found.",
    };
  }

  // reset password link
  /**
   * 1. Create reset password model: userId, token, validity, isUsed
   * 2. Create reset password link with userId and token
   */

  const token = crypto.randomUUID();

  await ResetPassword.create({
    user: user._id,
    token,
  });

  const resetPasswordLink = `${config.appUrl}/reset-password?user=${user._id}&token=${token}`;

  await sendEmail({
    to: data.email,
    subject: "Reset password",
    html: `
      <h1>Reset Password</h1>
      <p>Please click the link below to reset your password.</p>
      <a
        href="${resetPasswordLink}"
        style="
          background-color: rgb(0, 119, 255);
          color: white;
          padding: 0.5rem 2.5rem 1rem;
          margin-top: 1rem;
        "
        >Reset password</a
      >
    `,
  });

  return {
    message: "Email sent successfully.",
  };
};

const resetPassword = async (input) => {
  const data = await ResetPassword.findOne({
    user: input.user,
    expiresAt: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  if (!data || data.token != input.token) {
    throw {
      message: "Invalid token or expired link.",
    };
  }

  if (data.isUsed) {
    throw {
      message: "Link already used.",
    };
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  await User.findByIdAndUpdate(input.user, {
    password: hashedPassword,
  });

  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });

  return {
    message: "Password reset successful.",
  };
};

export default { login, register, forgotPassword, resetPassword };
