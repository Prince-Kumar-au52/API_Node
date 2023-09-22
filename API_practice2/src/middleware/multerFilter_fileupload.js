const multer=require("multer")

exports.filter = (req, file, callBack) => {
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg"
        ) {
          callBack(null, true);
        } else {
          callBack(null, false);
        }
      };