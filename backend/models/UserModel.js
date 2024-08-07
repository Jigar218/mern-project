const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is require"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is require"],
    },
    password: {
      type: String,
      required: [true, "password is require"],
    },
    profile: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
