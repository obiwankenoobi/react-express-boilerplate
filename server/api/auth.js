const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const passport = require("passport");
const { Auth } = require("../services/auth.js");

// path to activate account
router.get("/activate/:token/:email", Auth.activate);

function passportLogin() {
  try {
    passport.authenticate("local");
  } catch (error) {
    console.log(error);
  }
}
// login method
router.post("/login", passport.authenticate("local"), Auth.login);

// route to signup
router.post(
  "/signup",
  [check("username").isEmail(), check("password").isLength({ min: 8})],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({
        error: errors.array()
      });
      return res.status(422).json({
        errors: errors.array()
      });
    }

    Auth.signup(req, res, next);
  }
);

// sample to test private route
router.get(
  "/private",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) =>
    res.status(200).json({
      msg: "OK",
      user: req.user
    })
);

// send email to reset password
router.post("/reset-password-email", Auth.resetPasswordEmail);

// reset password
router.post(
  "/reset-password",
  passport.authenticate("jwt", { session: false }),
  Auth.resetPassword
);

module.exports = router;
