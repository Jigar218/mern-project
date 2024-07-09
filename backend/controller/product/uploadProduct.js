const UploadProductPermission = require("../../helper.js/permission");
const productModel = require("../../models/productModel");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!UploadProductPermission(sessionUserId)) {
      throw new Error("Permission Denied");
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(200).json({
      data: saveProduct,
      message: "Product Upload Successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = UploadProductController;
