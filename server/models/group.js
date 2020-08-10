const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const config = require("../config/default.json");

const groupSchema = new mongoose.Schema({
  g_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  g_password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  g_createdAt: { type: Date, default: Date.now },
  g_Admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  users: Array,
  tasks: Array,
});

const Group = mongoose.model("Group", groupSchema);

function validateGroup(group) {
  const schema = Joi.object({
    g_name: Joi.string().min(2).max(255).required(),
    g_password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(group);
}

exports.Group = Group;
exports.validateGroup = validateGroup;

