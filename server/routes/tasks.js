const express = require("express");
const { List } = require("../models/list");
const { Task } = require("../models/task");
const { Board } = require("../models/board");
const auth = require("../middleware/auth");
const boardAuth = require("../middleware/boardAuth");

const router = express.Router();

router.get("/:id", auth, boardAuth, async (req, res) => {
  const card = await Task.findOne({ id: req.params.id });
  if (!card) {
    res.status(404).send("Card not found");
  } else {
    res.send(card);
  }
});

module.exports = router;
