const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

async function SignUpController(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("Already user Exits");
    }

    if (!email) {
      throw new Error("Please Provide Email");
    }
    if (!name) {
      throw new Error("Please Provide Name");
    }
    if (!password) {
      throw new Error("Please Provide Password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      throw new Error("Something Went Wrong");
    }
    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };
    const userData = new userModel(payload);
    const saveUser = await userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Successfully",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = SignUpController;
