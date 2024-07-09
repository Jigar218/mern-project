const stripe = require("../../config/stipe");
const userModel = require("../../models/UserModel");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    console.log("cartss", cartItems);
    const user = await userModel.findOne({ _id: req.userId });
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: process.env.SHIPPING_RATE,
        },
      ],

      customer_email: user.email,
      metadata: {
        userId: req.userId,
      },
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImg,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.selling * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONT_URL}/success`,
      cancel_url: `${process.env.FRONT_URL}/cancel`,
    };
    const session = await stripe.checkout.sessions.create(params);

    res.status(303).json(session);
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = paymentController;
