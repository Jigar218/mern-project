const userModel = require("../models/UserModel");

async function userDetailsController(req, res) {
  try {
    // console.log("user id", req.userId);
    const user = await userModel.findById(req.userId);
    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "User details",
    });

    // console.log("user", user);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}
module.exports = userDetailsController;
