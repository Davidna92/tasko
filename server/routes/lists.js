const express = require("express");
const { Board, validateBoard } = require("../models/board");
const { User } = require("../models/user");
const { List } = require("../models/list");
const { Task } = require("../models/task");
const auth = require("../middleware/auth");
const boardAuth = require("../middleware/boardAuth");

const router = express.Router();

router.post("/add-list", auth, boardAuth, async (req, res) => {
  const id = req.board._id;
  console.log(id);
  const board = await Board.findOne({ _id: id });
  console.log(board);
  if (!board) return res.status(404).send("No such board");

  let list = new List({
    listTitle: req.body.listTitle,
    listTasks: req.listTasks,
  });
  board.boardLists.push(list);
  await list.save();
  await board.save();
  res.send(list);
});

router.post("/add-task/:id", auth, boardAuth, async (req, res) => {
  const listId = req.params.id;
  const board = await Board.findOne({ _id: req.board._id });

  const list = await List.findOne({ _id: listId });
  if (!list) return res.status(404).send("List not found");

  const task = new Task({
    text: req.body.text,
  });
  list.listTasks.push(task);
  // await task.save();
  await list.save();
  await board.save();
  res.send(task)
});

module.exports = router;
