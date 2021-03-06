const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header("boardToken");
  if (!token) return res.status(401).send("Missing board token. Access denied");

  try {
    const decoded = jwt.verify(token, config.get("jwtKey"));
    req.board = decoded;
    next();
  } catch (err) {
    console.log(err);
      res.status(400).send('Invalid token.');
  }
};
