const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is require"],
    },
    brandName: {
      type: String,
      required: [true, "brand name is require"],
    },
    category: {
      type: String,
      required: [true, "category is require"],
    },
    productImg: {
      type: [],
    },

    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    selling: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
