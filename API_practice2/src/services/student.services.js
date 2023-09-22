const Student = require("../modles/students"); // Correct the path to the models file.
const Validate = require("../middleware/joi_validation");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;

dotenv.config();

exports.PostStudentData = async (req, res) => {};
