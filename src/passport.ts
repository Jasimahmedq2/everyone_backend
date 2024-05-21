// src/config/passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config";

passport.serializeUser<any, any>((user, done) => {
  // done(null, user);
});

passport.deserializeUser<any, any>((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.client_id as string,
      clientSecret: config.google.client_secret as string,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // You can save or retrieve user profile from your database here
      return done(null, profile);
    }
  )
);

export default passport;
