const express = require("express");
const { Board, validateBoard } = require("../models/board");
const { User } = require("../models/user");
// const { List } = require("../models/list");
// const { Task } = require("../models/task");
const auth = require("../middleware/auth");
const boardAuth = require("../middleware/boardAuth");

const _ = require("lodash");
const router = express.Router();

//Post board
router.post("/", auth, async (req, res) => {
  let board = new Board({
    boardName: req.body.boardName,
    boardPassword: req.body.boardPassword,
    boardCreator: req.user._id,
  });
  post = await board.save();
  res.send(board);
});

// Join to a board with  user auth
router.put("/", auth, async (req, res) => {
  const board = await Board.findOne({
    boardName: req.body.boardName,
    boardPassword: req.body.boardPassword,
  });
  if (!board) {
    return res.status(404).send("This board does not exist");
  }
  let user = await User.findById(req.user._id);

  let checkUser = board.boardMembers.find(
    (item) => item._id.toString() === user._id.toString()
  );
  if (checkUser) {
    res.status(401).send("User already exists");
  } else {
    board.boardMembers.push(user._id); // pushing user id into boardMembers
    await board.save(); //saving update
    res.json({ boardToken: board.generateAuthToken() });
  }
})

////////GET Board 
router.get("/one", auth, boardAuth, async (req, res) => {
  const board = await Board.findOne({ _id: req.board._id });
  if (!board) {
    res.status(404).send("Board not found");
  } else {
    res.send(board);
  }
});

module.exports = router;
