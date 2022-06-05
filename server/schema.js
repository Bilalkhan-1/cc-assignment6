const mongoose = require("mongoose");

const quadraticSchema = mongoose.Schema({
  A: String,
  B: String,
  C: String,
  Root_1: String,
  Root_2: String,
});

const quadraticEquation = mongoose.model("quadraticEquation", quadraticSchema);
module.exports = quadraticEquation;
