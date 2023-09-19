const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const database = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("database connect successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = database;