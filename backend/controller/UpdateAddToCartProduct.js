const addToCartModel = require("../models/cartProduct");

const UpdateAddTocartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req?.body?._id;
    const qty = req.body.quantity;
    const updateProduct = await addToCartModel.updateOne(
      { _id: addToCartProductId },
      {
        ...(qty && { quantity: qty }),
      }
    );

    res.status(200).json({
      data: updateProduct,
      message: "Product qty Successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = UpdateAddTocartProduct;
