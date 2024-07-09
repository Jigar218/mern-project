const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).json({
        message: "Please Login...",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      console.log(err);
      console.log(decoded);

      if (err) {
        console.log("Auth err", err);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      success: false,
      error: true,
    });
  }
}
module.exports = authToken;
