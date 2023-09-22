// const ValidationError = require("joi"); // This line is not needed, as you're not using it
// const PostStudentData = require("../services/student.services");
const Student = require("../modles/students");
const Validate = require("../middleware/joi_validation");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;

dotenv.config();

// exports.PostStudent = async (req, res) => {
//   // console.log(req.file);
//   try {
//     const dailyStudent = req.body;
//     const result = await PostStudentData.PostStudentData(dailyStudent);
//   } catch (error) {
//     if (error.isJoi) {
//       console.log(error);
//       return res.status(400).send({ message: error.message }); // Use 'message' instead of 'massage'
//     }
//     return res.status(500).send({ error: "Internal Server Error " });
//   }
// };
exports.PostStudent = async (req, res) => {
  try {
    let hash = await bcrypt.hash(req.body.password, saltRounds);

    const value = await Validate.validation.validateAsync(req.body);

    const success = await Student.create({
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
      image: req.file ? req.file.path : "", // Handle case where req.file is undefined
      marks: req.body.marks,
    });

    if (success) {
      jwt.sign(
        { id: success._id },
        process.env.secretKey,
        { expiresIn: process.env.Range },
        (err, token) => {
          if (err) {
            return res.status(500).send({ error: "JWT Sign Error" });
          }
          return res.json({ token }); // Return the token and ensure response is sent only once
        }
      );
    } else {
      return res.status(400).send({ error: "not created..." });
    }
  } catch (error) {
    if (error.isJoi) {
      console.log(error);
      return res.status(400).send({ message: error.message }); // Use 'message' instead of 'massage'
    }
    return res.status(500).send({ error: "Internal Server Error " });
  }
};

exports.DeleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Student.findByIdAndDelete(id);
    if (success) {
      res.status(200).send({ message: "Deleted ......" });
      console.log("Data deleted successfully....");
    } else {
      res.status(400).send({ error: "not deleted..." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.GetStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Student.aggregate([
      { $match: { name: "Sristy Raj" } },
    ]);
    if (success) {
      res.status(200).send({ success, message: "Ok ......" });
      console.log(success);
    } else {
      res.status(400).send({ error: "not ok ..." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.UpdateStudentPut = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = {
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      image: req.file.path,
      marks: req.body.marks,
    };

    const success = await Student.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
    });

    if (success) {
      res.status(200).send({ message: "Student updated ......" });
      console.log(success);
    } else {
      res.status(400).send({ error: "not updated..." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.UpdateStudentPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = {};

    // Only update the fields that are present in the request body
    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.gender) updatedData.gender = req.body.gender;
    if (req.body.email) updatedData.email = req.body.email;
    if (req.body.phone) updatedData.phone = req.body.phone;
    if (req.body.password) updatedData.password = req.body.password;
    if (req.file.path) updatedData.image = req.file.path;
    if (req.body.marks) updatedData.marks = req.body.marks;

    const success = await Student.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
    });

    if (success) {
      res.status(200).send({ message: "Student updated ......" });
      console.log(success);
    } else {
      res.status(400).send({ error: "not updated..." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
