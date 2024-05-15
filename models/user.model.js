const mongoose = require("mongoose");
const { Schema } = mongoose;

// create a model for the User of the Schema
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  googleId: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
