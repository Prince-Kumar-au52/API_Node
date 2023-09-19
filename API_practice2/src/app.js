const express = require("express");
const app = express();
const studentroute = require("../src/routes/students");
const mongodb = require("./config/mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

mongodb();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", studentroute);

app.use((req, res, next) => {
  res.status(404).json({
    error: "bad request",
  });
});

module.exports = app;
