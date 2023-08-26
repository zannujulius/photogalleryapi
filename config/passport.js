const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const passport = require("passport");
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, callback) => {
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const newUser = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile?.emails[0].value,
          googleId: profile?.id,
        });
        if (newUser) {
          newUser.save();
          callback(null, profile);
        }
      } else {
        callback(null, profile);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
