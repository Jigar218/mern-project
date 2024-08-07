const stripe = require("../../config/stipe");
const addToCartModel = require("../../models/cartProduct");
const orderModel = require("../../models/orderModel");

const endpointSecret =
  "whsec_bbb02e92a201dedc846de830cda6694ceccff6b3b05a8533e4f1ad8f1f5b307e";

async function getLineItems(lineItems) {
  let ProductItems = [];
  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;
      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };
      ProductItems.push(productData);
    }
  }
  return ProductItems;
}

const webhooksController = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const payloadString = JSON.stringify(request.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      // console.log(lineItems);
      const productDetails = await getLineItems(lineItems);
      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
        },
        shipping_options: session.shipping_options.map((e) => {
          return {
            ...e,
            shipping_amount: e.shipping_amount / 100,
          };
        }),
        totalAmount: session.amount_total / 100,
      };
      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();
      if (saveOrder?._id) {
        const deleteCartItem = await addToCartModel.deleteMany({
          userId: session.metadata.userId,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send();
};
module.exports = webhooksController;
