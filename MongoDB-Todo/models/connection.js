const mongoose = require("mongoose");
var db = mongoose.connect(
  "mongodb+srv://sofiailiana:sofia@cluster0.z3lhgfp.mongodb.net/todos?retryWrites=true&w=majority"
);

module.exports = db;
