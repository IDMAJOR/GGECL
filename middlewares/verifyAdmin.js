const jwt = require("jsonwebtoken");

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized. No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the adminAuthId to the request object
    req.adminAuthId = decoded.adminAuthId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).send({ message: "Invalid or expired token" });
  }
};

module.exports = verifyAdmin;
