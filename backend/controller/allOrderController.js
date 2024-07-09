const orderModel = require("../models/orderModel");
const userModel = require("../models/UserModel");

const allOrderController = async (req, res) => {
  const userId = req.userId;
  const user = await userModel.findById(userId);
  if (user.role !== "ADMIN") {
    return res.status(500).json({
      message: "Not Access",
    });
  }
  const allOrder = await orderModel.find().sort({ createAt: -1 });
  return res.status(200).json({
    message: "All Order",
    data: allOrder,
    success: true,
  });
};
module.exports = allOrderController;
