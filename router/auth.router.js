const router = require("express").Router();
const passport = require("passport");
const { postLogin, postSignUp } = require("../controller/auth.controller");

router.post("/login", (req, res) => {
  res.send("Got here");
});

// google routes
router.get("/login/success", (req, res) => {
  // compare session from frontend and backend

  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Success",
      user: req.user,
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
    successRedirect: process.env.CLIENT_URL,
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
