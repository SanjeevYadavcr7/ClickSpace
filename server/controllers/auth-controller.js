const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const httpstatusCodes = require("../util/status-codes");
const { validationResult } = require("express-validator");

exports.postSignup = (req, res, next) => {
  //##################### Error handler for invalid requests ##########################
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new Error("User validation failed");
    error.statusCode = httpstatusCodes.UNPROCESSABLE_ENTITY;
    error.data = validationErrors.array();
    throw error;
  }

  //###################### If request gets validated it comes here #######################
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const user = new User({
    email,
    password,
    name,
  });

  //######################## Before saving there is a preSave method defined in user models #############
  user.save((err) => {
    if (err) {
      if (!err.statusCode)
        err.statusCode = httpstatusCodes.INTERNAL_SERVER_ERROR;
      return next(err);
    }

    res
      .status(httpstatusCodes.RESOURCE_CREATED)
      .json({ message: "New User created Successfully" });
  });
};
