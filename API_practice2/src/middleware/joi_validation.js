// import { Joi } from "joi";
const Joi = require("joi");

exports.validation = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  password: Joi.string().min(6).required(),
  // image: Joi.string().required(),
  marks: Joi.number().required(),
});
