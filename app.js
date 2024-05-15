const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();
const cors = require("cors");
const passportSetup = require("./config/passport");
const authRoute = require("./router/auth.router");
const morgan = require("morgan");
const User = require("./models/user.model");
require("dotenv").config();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    keys: ["bigname"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/sample", (req, res) => {
  res.send("Got here");
});

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users, "all users");
    res.send("Got here");
  } catch (error) {
    console.log(error);
  }
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,DELETE,PUT,PATCH",
    credentials: true,
  })
);

app.use("/auth", authRoute);

module.exports = {
  app,
};
