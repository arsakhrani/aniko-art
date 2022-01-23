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
    success_url: `http://localhost:3000/purchase-success/${artworkId}`, //to make
    cancel_url: "http://localhost:3000/discover/artworks",
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
    const { artwork } = req.body;
    const artworkToSell = await Artwork.findById(artwork._id);
    const buyer = await User.findById(artwork.highestBidHolder);

    const paymentMethods = await stripe.paymentMethods.list({
      customer: buyer.stripeId,
      type: "card",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: artwork.minimumBid * 100,
      currency: "eur",
      customer: buyer.stripeId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    });

    if (paymentIntent.status === "succeeded") {
      artworkToSell.sold = true;
      artworkToSell.save();
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ sucess: false });
    }
  } catch (err) {
    console.log("Error code is: ", err.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
      err.raw.payment_intent.id
    );
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
};
