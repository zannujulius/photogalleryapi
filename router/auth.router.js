const router = require("express").Router();
const passport = require("passport");
const { postLogin, postSignUp } = require("../controller/auth.controller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
// login route
router.post("/login", postLogin);

// signup route
router.post("/signup", postSignUp);

router.get("/completed/auth", (req, res) => {});

// google routes
router.get("/login/success", async (req, res) => {
  // compare session from frontend and backend
  // send token to frontend

  if (req.user) {
    console.log(req.user, "request user");
    const existingUser = await User.findOne({
      email: req.user?.emails[0].value,
    });
    console.log(req.user?.emails[0].value, "existing user");

    if (!existingUser) {
      res.status(403).json({
        error: true,
        message: "Not Authorized",
      });
      return;
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
      },
      process.env.TOKEN_KEY_1,
      {
        expiresIn: "24h",
      }
    );
    const { name, picture } = req.user._json;
    res.status(200).json({
      error: false,
      status: 200,
      message: "Success",
      data: {
        token,
      },
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}?authenticated=true`,
    failureRedirect: "/login/failed",
  })
);

// this route will open google constent screen
router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
