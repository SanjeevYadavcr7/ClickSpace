const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/user");
const authController = require("../controllers/auth-controller");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .custom(async (enteredEmail, { req }) => {
        const userDoc = await User.findOne({ email: enteredEmail });
        if (userDoc) {
          return Promise.reject("Email already exist");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("confirmPassword").custom((enteredConfirmPassword, { req }) => {
      if (enteredConfirmPassword != req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    body("name").trim().not().isEmpty(),
  ],
  authController.postSignup
);
module.exports = router;
