const bcrypt = require("bcryptjs");
const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
async function LoginController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please Provide Email");
    }
    if (!password) {
      throw new Error("Please Provide Password");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }

    const checkpassword = await bcrypt.compare(password, user.password);

    if (checkpassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8,
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please Check the password");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = LoginController;
