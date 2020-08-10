const express = require("express");
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();

//Post user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "groups"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

//Get user
router.get("/:id", auth, async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

module.exports = router;
