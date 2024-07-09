const UploadProductPermission = require("../../helper.js/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    if (!UploadProductPermission(req.userId)) {
      throw new Error("Permission Denied");
    }
    const { _id, ...resBody } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);
    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      error: false,
      data: updateProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = updateProductController;
