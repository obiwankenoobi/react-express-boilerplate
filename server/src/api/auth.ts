

import express from "express";
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator/check";
import passport from "passport";
import { Auth } from "../services/auth";

const router = express.Router();

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
  (req:Request, res:Response, next:NextFunction) => {
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
  (req:Request, res:Response, next:NextFunction) =>
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
  passport.authenticate("jwt", {
    session: false
  }),
  Auth.resetPassword
);

export default router;
