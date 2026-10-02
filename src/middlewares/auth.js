import jwt from "../utils/jwt.js";

// Verify user logged in state (authentication)
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    const cookie = req.headers.cookie;

    token = cookie?.split("=")[1];
  }

  if (!token) {
    res.status(401).json({ message: "Unauthorized." });
  }

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
