const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

   
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data (id + role)
    req.user = decoded;

    next();
  } catch (err) {

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

 
    return res.status(401).json({ message: "Invalid token" });
  }
};
