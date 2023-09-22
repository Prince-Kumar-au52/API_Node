const express = require("express");
const router = express.Router();
const studentCtrl = require("../controllers/studentCtrl");
const jwtauth = require("../middleware/jwt_auth");
const multer = require("multer");
const multer_file = require("../middleware/multer_fileupload");
const fileFilter = require("../middleware/multerFilter_fileupload");

const upload = multer({
  storage: multer_file.storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb
  },
  fileFilter: fileFilter.filter,
});

// Public route to create a new student (no authentication required)
router.post("/post", upload.single("studentImage"), studentCtrl.PostStudent);

// Protected route - Authentication required to get student data
router.get("/get", studentCtrl.GetStudent);

router.put("/put/:id", studentCtrl.UpdateStudentPut);

router.patch("/patch/:id", studentCtrl.UpdateStudentPatch);

router.delete("/delete/:id", jwtauth, studentCtrl.DeleteStudent);

module.exports = router;
