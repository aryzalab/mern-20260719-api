import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (payload) => {
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: "1d",
  });

  return token;
};

export default { generateToken };
