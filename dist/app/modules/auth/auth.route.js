"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post("/registration", (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchema.CreateUser), auth_controller_1.AuthUserControllers.createUser);
router.post("/logIn", (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchema.logInUser), auth_controller_1.AuthUserControllers.LogIn);
// Google Auth Route
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Google Auth Callback
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
    console.log({ googleReq: req });
    // Successful authentication, redirect home or do something else
    res.redirect("/");
});
// Facebook Auth Route
router.get("/facebook", passport_1.default.authenticate("facebook", { scope: ["email"] }));
// Facebook Auth Callback
router.get("/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/login" }), function (req, res) {
    // Successful authentication, redirect home or do something else
    res.redirect("/");
});
router.post("/verify/:token", auth_controller_1.AuthUserControllers.verifyEmailAndUpdateStatus);
exports.AuthRoutes = router;
