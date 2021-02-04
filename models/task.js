const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  todoName: {
    type: String,
    required: [true, "Oops! Please type something."],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
