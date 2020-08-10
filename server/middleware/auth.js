const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Missing token. Access denied");

  try {
    const decoded = jwt.verify(token, config.get("jwtKey"));
    req.user = decoded;
    next();
  } catch (err) {
      res.status(400).send('Invalid token.');
  }
};
