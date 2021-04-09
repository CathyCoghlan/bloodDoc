const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const Doctor = require("../models/doctor");

const router = express.Router();

router.get("/register", authController.getRegister);

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password", "Password must be at least 5 characters")
      .isLength({
        min: 5,
      })
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return Doctor.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email exists already, please choose a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    check("code").custom((value, { req }) => {
      return Doctor.findOne({ code: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "Code exists already, please enter your unique GP Code."
          );
        }
      });
    }),
    body("password", "Password must be at least 5 characters")
      .isLength({ min: 5 })
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.postRegister
);

router.post("/logout", authController.postLogout);

module.exports = router;
