const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/user");
const authController = require("../controllers/auth-controller");
const { isValidated } = require("../middlewares/isValidated");

router.post(
  "/findEmail",
  [
    body("email")
      .isLength({ min: 1 })
      .trim()
      .withMessage("Email can not be empty")
      .isEmail()
      .withMessage("Please enter a valid email address"),
  ],
  isValidated,
  authController.findEmail
);

router.post(
  "/verifyOtp",
  [
    body("email")
      .isLength({ min: 1 })
      .trim()
      .withMessage("Email can not be empty")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),
  ],
  isValidated,
  authController.verifyOtp
);

router.post(
  "/signup",
  [
    body("email")
      .isLength({ min: 1 })
      .trim()
      .withMessage("Email can not be empty")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .trim()
      .withMessage("Password must be 8 characters or greater"),
    body("confirmPassword").custom((enteredConfirmPassword, { req }) => {
      if (enteredConfirmPassword != req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    body("name").trim().not().isEmpty(),
  ],
  isValidated,
  authController.postSignup
);
module.exports = router;
