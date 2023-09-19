const Student = require("../modles/students");

exports.PostStudent = async (req, res) => {
  try {
    const success = await Student.create({
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });
    if (success) {
      res.status(200).send({ message: "Student created ......" });
      console.log(success);
    } else {
      res.status(400).send({ error: "not created..." });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Student.findByIdAndUpdate(id, {
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });
    if (success) {
      res.status(200).send({ message: "Student updated ......" });
      console.log(success);
    } else {
      res.status(400).send({ error: "not updated..." });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Student.findByIdAndDelete(id);
    if (success) {
      res.status(200).send({ message: " deleteded ......" });
      console.log("data deleted succesfully....");
    } else {
      res.status(400).send({ error: "not deleteded..." });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.GetStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Student.find();
    if (success) {
      res.status(200).send({ success, message: "Ok ......" });
      console.log(success);
    } else {
      res.status(400).send({ error: "not ok ..." });
    }
  } catch (error) {
    console.log(error);
  }
};
