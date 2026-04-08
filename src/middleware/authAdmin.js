const jwt = require("jsonwebtoken");

require("dotenv").config();


function authAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ error: "missing token" });

  console.log("llego el token", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);

    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ error: "access denied. admins only" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log("ERROR:", error.message) 
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authAdmin;
