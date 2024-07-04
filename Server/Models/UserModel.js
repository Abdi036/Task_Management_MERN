const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user must have a name."],
    unique: true,
  },
  email: {
    type: String,
    requierd: [true, "user must have an email."],
    unique: true,
  },
  password: {
    type: String,
    requierd: [true, "user must have a password"],
  },
});
