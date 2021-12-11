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

  console.log(session);
  res.json({ url: session.url });
};

module.exports.createCheckoutSaveSession = async (req, res) => {
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

  console.log(session);
  res.json({ url: session.url });
};
