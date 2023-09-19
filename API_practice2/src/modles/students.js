const mongoose = require("mongoose");

const studentScema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
  phone: Number,
  password: String,
});

module.exports = mongoose.model("Student", studentScema);
