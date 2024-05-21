import express from "express";
import { AuthUserControllers } from "./auth.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { AuthValidationSchema } from "./auth.validation";
import auth from "../../middleware/auth";
import passport from "passport";
const router = express.Router();

router.post(
  "/registration",
  ValidateRequest(AuthValidationSchema.CreateUser),
  AuthUserControllers.createUser
);

router.post(
  "/logIn",
  ValidateRequest(AuthValidationSchema.logInUser),
  AuthUserControllers.LogIn
);

// Google Auth Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Auth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log({ googleReq: req });
    // Successful authentication, redirect home or do something else
    res.redirect("/");
  }
);

// Facebook Auth Route
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// Facebook Auth Callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home or do something else
    res.redirect("/");
  }
);

router.post("/verify/:token", AuthUserControllers.verifyEmailAndUpdateStatus);

export const AuthRoutes = router;
