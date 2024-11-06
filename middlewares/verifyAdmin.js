const jwt = require("jsonwebtoken");

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).send({ message: "Unauthorized. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminAuthId = decoded.adminAuthId; // Attach the adminAuthId to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).send({ message: "Invalid or expired token" });
  }
};

module.exports = verifyAdmin;
