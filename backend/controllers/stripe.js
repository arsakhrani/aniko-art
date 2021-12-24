const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeKey);
const Artwork = require("../models/Artwork");
const User = require("../models/User");

module.exports.createCheckoutBuySession = async (req, res) => {
  const { artworkId, userId } = req.body;
  const artwork = await Artwork.findById(artworkId);
  const user = await User.findById(userId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `${artwork.title} by ${artwork.artist}`,
            images: [artwork.pictures[0]],
          },
          unit_amount: artwork.price * 100,
        },
        quantity: 1,
      },
    ],
    customer_email: user.email,
    mode: "payment",
    success_url: "http://localhost:3000/success", //to make
    cancel_url: "http://localhost:3000/cancel", //to make
  });

  res.json({ url: session.url });
};

module.exports.createCheckoutSaveSession = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  const setupIntent = await stripe.setupIntents.create({
    customer: user.stripeId,
    payment_method_types: ["card"],
  });

  res.json({ client_secret: setupIntent.client_secret });
};

module.exports.chargeBid = async (req, res) => {
  try {
    const { artworkId } = req.body;
    const artwork = await Artwork.findById(artworkId);
    const buyer = await User.findById(artwork.highestBidHolder);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: artwork.minimumBid * 100,
      currency: "eur",
      customer: buyer.stripeId,
      payment_method: buyer.paymentMethodId,
      off_session: true,
      confirm: true,
    });
    console.log(paymentIntent);
  } catch (err) {
    console.log("Error code is: ", err.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
      err.raw.payment_intent.id
    );
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
};
