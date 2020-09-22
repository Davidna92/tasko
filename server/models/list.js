const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
    maxLength: 255,
    minLength: 1,
  },
  cards: Array,
});

// { type: mongoose.Schema.Types.ObjectId, ref: "tasks" }

const List = mongoose.model("lists", listSchema);

function validateList(list) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
  });
  return schema.validate(list);
}

exports.List = List;
exports.validateList = validateList;
