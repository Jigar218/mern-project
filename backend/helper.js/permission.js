const userModel = require("../models/UserModel");

const UploadProductPermission = async (userId) => {
  const user = await userModel.findById(userId);

  if (user.role !== "ADMIN") {
    return false;
  }

  return false;
};

module.exports = UploadProductPermission;
