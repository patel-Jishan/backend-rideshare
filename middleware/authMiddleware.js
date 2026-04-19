const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Format: Bearer TOKEN
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data (id + role)
    req.user = decoded;

    next();
  } catch (err) {
    // Token expired
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // Invalid token
    return res.status(401).json({ message: "Invalid token" });
  }
};