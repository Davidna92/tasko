const express = require("express");
const { Board, validateBoard } = require("../models/board");
const { User } = require("../models/user");
const { List } = require("../models/list");
const { Task } = require("../models/task");
const auth = require("../middleware/auth");
const boardAuth = require("../middleware/boardAuth");

const router = express.Router();

router.get("/:id", auth, boardAuth, async (req, res) => {
  const list = await List.findOne({ _id: req.params.id });
  if (!list) {
    res.status(404).send("List not found");
  } else {
    res.send(list);
  }
});

router.post("/add-list", auth, boardAuth, async (req, res) => {
  const id = req.board._id;
  const board = await Board.findOne({ _id: id });
  if (!board) return res.status(404).send("No such board");

  let list = new List({
    title: req.body.title,
    cards: req.cards,
  });
  board.boardLists.push(list);
  await list.save();
  await board.save();
  res.send(list);
});

router.post("/add-task/:id", auth, boardAuth, async (req, res) => {
  const listId = req.params.id;

  try {
    const board = await Board.findOne({ _id: req.board._id });
    if (!board) return res.status(404).send("no such board");

    const list = await List.findOne({ _id: listId });
    if (!list) return res.status(404).send("List not found");

    const task = new Task({
      text: req.body.text,
    });

    board.boardLists = board.boardLists.map((list) => {
      if (listId.toString() === list._id.toString()) {
        return {
          ...list,
          cards: list.cards.concat(task),
        };
      } else {
        return list;
      }
    });

    await board.save();
    res.send(board);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
