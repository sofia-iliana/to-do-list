const Todo = require("../models/TodoModel.js");

const getTodo = async (req, res) => {
  var todo = await Todo.find();
  res.send(todo);
};

const postTodo = async (req, res) => {
  await Todo.create(req.body);
  var todo = await Todo.find();
  res.send(todo);
};

const deleteTodo = async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  var todo = await Todo.find();
  res.send(todo);
};

const updateTodo = async (req, res) => {
  await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body);
  var todo = await Todo.find();
  res.send(todo);
};

module.exports = {
  getTodo,
  postTodo,
  deleteTodo,
  updateTodo,
};
