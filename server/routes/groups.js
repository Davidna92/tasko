const express = require("express");
const { Group, validateGroup } = require("../models/group");
const auth = require("../middleware/auth");
const _ = require("lodash");
const router = express.Router();

//Post group
router.post("/", async (req, res) => { //+ auth
  let group = new Group({
    g_name: req.body.g_name,
    g_password: req.body.g_password,
    g_Admin: req.body.g_Admin_id,
  });
  post = await group.save();
  res.send(group);
});

module.exports = router;
