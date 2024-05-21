"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/passport.ts
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = __importDefault(require("./config"));
passport_1.default.serializeUser((user, done) => {
    // done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.google.client_id,
    clientSecret: config_1.default.google.client_secret,
    callbackURL: "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    // You can save or retrieve user profile from your database here
    return done(null, profile);
}));
exports.default = passport_1.default;
