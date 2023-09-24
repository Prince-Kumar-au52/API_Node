const mongoose = require("mongoose");
const dailyEventStudent = require("../services/student.services");
// const students = require("../modles/students");

exports.PostStudent = async (req, res) => {
  try {
    const dailyCategory = req.body;
    const result = await dailyEventStudent.PostStudentData(dailyCategory);
    return res.status(200).send({ result });
  } catch (error) {
    if (error.isJoi) {
      console.log(error);
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ error: "Internal Server Error cont" });
  }
};

exports.DeleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await dailyEventStudent.DeleteStudentData(id);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.GetStudent = async (req, res) => {
  try {
    const result = await dailyEventStudent.GetStudentData(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.UpdateStudentPut = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const success = await dailyEventStudent.UpdateStudentPutData(
      id,
      updatedData,
      {
        new: true,
      }
    );
    res.status(200).send({ success });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.GetByIdStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await dailyEventStudent.GetByIDStudentData(id);
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.GetStudentName = async (req, res) => {
  try {
    const result = await dailyEventStudent.GetByNameStudentData(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
