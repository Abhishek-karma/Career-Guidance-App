
const jwt = require("jsonwebtoken");



exports.adminAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Retrieve token from 'Authorization: Bearer token'
  

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using your secret key
    req.user = decoded; // Add the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};




exports.studentAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = decoded; // Changed from req.user to req.student
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
