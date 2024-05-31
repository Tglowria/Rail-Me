const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const isAuthenticated = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw new Error("Authentication failed");

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) throw new Error("Authentication failed");
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Authentication failed: 🔒🔒🔒🔒🔒" });
    }
  };

  module.exports = isAuthenticated;