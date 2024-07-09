const addToCartModel = require("../models/cartProduct");

const addTocartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req?.userId;
    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Already Exists in cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddTocart = new addToCartModel(payload);
    const saveProduct = await newAddTocart.save();
    res.json({
      data: saveProduct,
      message: "Product added in Cart",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = addTocartController;
