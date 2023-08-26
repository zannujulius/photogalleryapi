const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({
      status: 400,
      message: "Please provide your email address.",
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      status: 400,
      message: "Please provide your password.",
    });
    return;
  }

  const existingUser = await User.findOne({
    email: email,
  });

  if (!existingUser) {
    return res.status(400).json({
      status: 400,
      message: "Invalid credentials. Please try again",
    });
  }

  const decryptPassword = await bcrypt.compare(password, existingUser.password);
  if (decryptPassword) {
    const token = jwt.sign(
      {
        _id: existingUser._id,
      },
      process.env.TOKEN_KEY_1,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      message: "success",
      data: { email, token: token },
    });
  } else {
    res.json({
      message: "Invalid credentials. Please try again",
    });
  }
};

const postSignUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName) {
    res.status(400).json({
      status: 400,
      message: "Please provide your first name.",
    });
    return;
  }
  if (!lastName) {
    res.status(400).json({
      status: 400,
      message: "Please provide your last name.",
    });
    return;
  }

  if (!email) {
    res.status(400).json({
      status: 400,
      message: "Please provide your email.",
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      status: 400,
      message: "Please provide your password.",
    });
    return;
  }

  const existingUser = await User.findOne({
    email: email,
  });

  if (existingUser) {
    return res.status(400).json({
      status: 400,
      message: "User already exist please try again",
    });
  }

  const encyrptedPassword = await bcrypt.hash(password, 8);
  const role = "user";
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: encyrptedPassword,
    role,
  });

  res.status(200).json({
    status: 200,
    message: "Profile created successfully",
  });
};

module.exports = {
  postLogin,
  postSignUp,
};
