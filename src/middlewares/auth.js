import jwt from "../utils/jwt.js";

// Verify user logged in state (authentication)
const auth = (req, res, next) => {
  const cookie = req.headers.cookie;

  const token = cookie?.split("=")[1];

  try {
    const data = jwt.verifyToken(token);

    req.user = data;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid token." });
  }
};

export default auth;
