module.exports = (...roles) => {
  return (req, res, next) => {
    try {
      // 🔐 Not logged in
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // 🚫 Role not allowed
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: `Role (${req.user.role}) not allowed`,
        });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};