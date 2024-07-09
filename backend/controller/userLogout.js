async function UserLogout(req, res) {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("token", tokenOption);
    res.json({
      message: "Logged Out Successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}
module.exports = UserLogout;
