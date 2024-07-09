const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "product",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is require"],
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const addToCartModel = mongoose.model("addToCart", addToCartSchema);

module.exports = addToCartModel;
