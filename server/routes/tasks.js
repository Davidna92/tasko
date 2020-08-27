const express = require("express");
const { List } = require("../models/list");
const { Task } = require("../models/task");
const { Board } = require("../models/board");
const auth = require("../middleware/auth");
const boardAuth = require("../middleware/boardAuth");

const router = express.Router();

router.post('/:id/add-task', auth, boardAuth, async (req, res) => {
  const listId = req.params.id
})

module.exports = router;
