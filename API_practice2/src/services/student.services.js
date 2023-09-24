const Student = require("../modles/students"); // Corrected the path to the models file.
const Validate = require("../middleware/joi_validation");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;

dotenv.config();

exports.PostStudentData = async (dailyCategory) => {
  try {
    let hash = await bcrypt.hash(dailyCategory.password, saltRounds);
    const value = await Validate.validation.validateAsync(dailyCategory);
    const success = await Student.create(dailyCategory);
    console.log(success);

    if (success) {
      const token = jwt.sign({ id: success._id }, process.env.secretKey, {
        expiresIn: process.env.Range,
      });

      return { token };
    } else {
      return { error: "not created..." };
    }
  } catch (error) {
    if (error.isJoi) {
      console.log(error);
      return { message: error.message };
    }
    return { error: "Internal Server Error" };
  }
};

exports.DeleteStudentData = async (id) => {
  try {
    const success = await Student.findByIdAndDelete(id);
    if (success) {
      return { message: "Deleted ......" }; // Return a success message
    } else {
      return { error: "not deleted..." }; // Return an error message
    }
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

exports.GetStudentData = async (req, res) => {
  try {
    const success = await Student.find();
    if (success) {
      res.status(200).send({ success, message: "Ok ......" });
      console.log(success);
    } else {
      res.status(400).send({ error: "not ok ..." });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

exports.GetByIDStudentData = async (id) => {
  try {
    const success = await Student.findById(id);
    console.log(success);
    return success;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

exports.UpdateStudentPutData = async (id, updatedData) => {
  try {
    const success = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    console.log(success);
    return success;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

exports.GetByNameStudentData = async (req, res) => {
  try {
    const success = await Student.aggregate([
      {
        $match: { name: "Alka sinha" },
      },
    ]);
    if (success) {
      res.status(200).send({ success, message: "Ok ......" });
      console.log(success);
    } else {
      res.status(400).send({ error: "not ok ..." });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};
