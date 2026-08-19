import authServices from "../services/auth.services.js";
import jwt from "../utils/jwt.js";

const login = async (req, res) => {
  try {
    const data = await authServices.login(req.body);

    const token = jwt.generateToken(data);

    res.cookie("authToken", token, {
      maxAge: 86400 * 1000, // 1 day in milliseconds
    });

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const data = await authServices.register(req.body);

    const token = jwt.generateToken(data);

    res.cookie("authToken", token, {
      maxAge: 86400 * 1000, // 1 day in milliseconds
    });

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("authToken");

  res.json({ message: "Logout succcessful" });
};

export default { login, register, logout };
