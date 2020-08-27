const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 1024,
    minLength: 2,
  },
 taskOf: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
});

const Task = mongoose.model("Task", taskSchema);


exports.Task = Task;
