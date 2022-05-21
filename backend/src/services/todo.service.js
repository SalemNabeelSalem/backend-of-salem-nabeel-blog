const ToDoModel = require("../models/todo.model");

async function createNewToDo(todo) {
  const newToDo = await ToDoModel.create(todo);
  console.log(newToDo);
}

module.exports = { createNewToDo };