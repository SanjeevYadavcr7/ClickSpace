const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const OtpModel = require("../models/otp");
const httpstatusCodes = require("../util/status-codes");
const { generateNewOtp } = require("../util/otp-generator");
const CONSTANTS = require("../util/constants");

const generateOtpForUser = async (userEmail) => {
  try {
    const existingOtpForThisUser = await OtpModel.findOne({
      email: userEmail,
    });
    if (existingOtpForThisUser) {
      await OtpModel.findOneAndDelete({ email: userEmail });
    }

    const generatedOtp = generateNewOtp(CONSTANTS.OTP_LENGTH);
    const date = new Date();
    expiryDate = date.setTime(
      date.getTime() + CONSTANTS.OTP_VALIDITY * 60 * 1000
    );
    const otp = new OtpModel({
      email: userEmail,
      otp: generatedOtp,
      expiryDate,
    });

    await otp.save();
    return generatedOtp;
  } catch (err) {
    if (!err.statusCode) err.statusCode = httpstatusCodes.INTERNAL_SERVER_ERROR;
    return next(err);
  }
};

/**
 * Find email Controller
 *
 * @param {string} email
 *
 * @returns {Object}
 */

exports.findEmail = async (req, res, next) => {
  const enteredEmail = req.body.email;
  try {
    const userExists = await User.findOne({ email: enteredEmail });
    if (userExists) {
      return res
        .status(httpstatusCodes.OK)
        .json({ message: "The user exists in database. Redirect to login" });
    }

    const generatedOtp = await generateOtpForUser(enteredEmail);

    res
      .status(httpstatusCodes.NOT_FOUND)
      .json({ message: "The user does not exists. Redirect to Enter OTP" });
    // Send Mail Here
  } catch (err) {
    if (!err.statusCode) err.statusCode = httpstatusCodes.INTERNAL_SERVER_ERROR;
    return next(err);
  }
};

/**
 * Verify Otp Controller
 *
 * @param {string} email
 * @param {string} enteredOtp
 *
 * @returns {Object}
 */

exports.verifyOtp = async (req, res, next) => {
  const enteredEmail = req.body.email;
  const enteredOtp = req.body.enteredOtp;

  try {
    const otpDoc = await OtpModel.findOne({ email: enteredEmail });

    if (!otpDoc) {
      return res
        .status(httpstatusCodes.NOT_FOUND)
        .json({ message: "No Otp found for this user" });
    }

    const savedOtp = otpDoc.otp;
    const expiryDate = otpDoc.expiryDate;
    const date = new Date();
    if (expiryDate < date) {
      return res
        .status(httpstatusCodes.BAD_REQUEST)
        .json({ message: "The Otp is expired" });
    }

    if (enteredOtp !== savedOtp) {
      return res
        .status(httpstatusCodes.FORBIDDEN)
        .json({ message: "The entered otp does not match" });
    }

    await OtpModel.findOneAndDelete({ email: enteredEmail });
    res
      .status(httpstatusCodes.OK)
      .json({ message: "The OTP matched. Redirect to signup" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = httpstatusCodes.INTERNAL_SERVER_ERROR;
    return next(err);
  }
};

/**
 * Resend Otp Controller
 *
 * @param {*} email
 *
 * @returns {Object}
 */

exports.resendOtp = async (req, res, next) => {
  const enteredEmail = req.body.email;

  try {
    const generatedOtp = await generateOtpForUser(enteredEmail);
  } catch (err) {
    if (!err.statusCode) err.statusCode = httpstatusCodes.INTERNAL_SERVER_ERROR;
    return next(err);
  }
};

/**
 * Signup Controller
 *
 * @param {string} email
 * @param {string} password
 * @param {string} name
 *
 * @returns {Object}
 */

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const user = new User({
    email,
    password,
    name,
  });
  try {
    const savedUser = await user.save();
    // LogIn User by sending token + loggedIn
    res
      .status(httpstatusCodes.RESOURCE_CREATED)
      .json({ message: "New User created Successfully" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = httpstatusCodes.INTERNAL_SERVER_ERROR;
    return next(err);
  }
};
