const multer = require("multer");

exports.storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "./src/uploads/");
  },
  filename: function (req, file, callBack) {
    callBack(null, Date.now() + file.originalname);
  },
});
