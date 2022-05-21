const mongoose = require("../configs/mongodb.config");

const ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  duedate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const ToDoModel = mongoose.model("todo", ToDoSchema);

module.exports = ToDoModel;
