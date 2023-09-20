const db = require("./connection.js");
const mongoose = require("mongoose");

const Todo = mongoose.model("todo", {
  todo: String,
  done: { type: Boolean, default: false },
});

module.exports = Todo;
