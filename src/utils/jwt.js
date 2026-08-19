import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (payload) => {
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: "1d",
  });

  return token;
};

const verifyToken = (token) => {
  var decoded = jwt.verify(token, config.jwtSecret);

  return decoded;
};

export default { generateToken, verifyToken };
