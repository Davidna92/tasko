const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  listTitle: {
    type: String,
    required: true,
    maxLength: 255,
    minLength: 1,
  },
  listOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  listTasks: Array,
});

const List = mongoose.model("List", listSchema);

function validateList(list) {
  const schema = Joi.object({
    listTitle: Joi.string().min(1).max(255).required(),
  });
  return schema.validate(list);
}

exports.List = List;
exports.validateList = validateList;
