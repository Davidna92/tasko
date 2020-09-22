const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 1024,
    minLength: 2,
  },
});

const Task = mongoose.model("tasks", taskSchema);


exports.Task = Task;
