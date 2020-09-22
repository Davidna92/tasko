const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const boardSchema = new mongoose.Schema({
  boardName: {
    type: String,
    required: true,
    maxLength: 255,
    minLength: 2,
  },
  boardPassword: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  g_createdAt: { type: Date, default: Date.now },
  boardCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  boardMembers: Array,
  boardLists: Array,
});

// { type: mongoose.Schema.Types.ObjectId, ref: "lists" }

boardSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtKey"));
  return token;
};

const Board = mongoose.model("boards", boardSchema);

function validateBoard(board) {
  const schema = Joi.object({
    boardName: Joi.string().min(2).max(255).required(),
    boardPassword: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(board);
}

exports.Board = Board;
exports.validateBoard = validateBoard;
