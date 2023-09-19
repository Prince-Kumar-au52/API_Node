const express = require("express");
const router = express.Router();
// const Student = require("../modles/students");
// const mongoose = require("mongoose");
const studentCtrl = require("../controllers/studentCtrl");

// router.get("/", (req, res, next) => {
//   res.status(200).json({
//     msg: "this is student get request",
//   });
// });

router.get("/get", studentCtrl.GetStudent);
router.post("/post", studentCtrl.PostStudent);
router.put("/update/:id", studentCtrl.UpdateStudent);
router.delete("/delete/:id", studentCtrl.DeleteStudent);

module.exports = router;
