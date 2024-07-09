const Stripe = require("stripe");

const stripe = Stripe(
  "sk_test_51PaGduRpurw9N6UuCLBs41i1ed7FLG36VfuErTYetJp5bjPRhFycqBRFnvewg6gDH1F472skBRSaRbSrnpzPhGOk000yZG29nf"
);
module.exports = stripe;
