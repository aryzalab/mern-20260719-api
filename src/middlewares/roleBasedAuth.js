const roleBasedAuth = (role) => (req, res, next) => {
  if (req.user.roles.includes(role)) return next();

  res.status(403).json({ message: "Access denied." });
};

export default roleBasedAuth;
