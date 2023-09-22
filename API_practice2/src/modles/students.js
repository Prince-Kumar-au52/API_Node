const mongoose = require("mongoose");

const studentScema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
  phone: Number,
  password: String,
  image:String,
  marks:Number
  
});

module.exports = mongoose.model("Student", studentScema);
