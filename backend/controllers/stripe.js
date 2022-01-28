const sendgridKey = process.env.TWILIO_SENDGRID_KEY;
const stripeKey = process.env.STRIPE_SECRET_KEY;
const devEmail = process.env.DEV_EMAIL;
const clientRootDomain = process.env.ROOT_DOMAIN_CLIENT;
const stripe = require("stripe")(stripeKey);
const Artwork = require("../models/Artwork");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const stripeEmails = require("./email-tamplates/stripeEmails");
const adminEmails = require("./email-tamplates/adminEmails");

const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendgridKey,
    },
  })
);

module.exports.createCheckoutBuySession = async (req, res) => {
  try {
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
      success_url: `${clientRootDomain}/purchase-success/${artworkId}/${userId}`,
      cancel_url: `${clientRootDomain}/discover/artworks`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
  }
};

module.exports.createCheckoutSaveSession = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    const setupIntent = await stripe.setupIntents.create({
      customer: user.stripeId,
      payment_method_types: ["card"],
    });

    res.json({ client_secret: setupIntent.client_secret });
  } catch (e) {
    console.log(e);
  }
};

module.exports.chargeBid = async (req, res) => {
  try {
    const { artwork } = req.body;
    const artworkToSell = await Artwork.findById(artwork._id);
    const buyer = await User.findById(artwork.highestBidHolder);
    const seller = await User.findById(artworkToSell.owner);

    const paymentMethods = await stripe.paymentMethods.list({
      customer: buyer.stripeId,
      type: "card",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: artwork.highestBid * 100,
      currency: "eur",
      customer: buyer.stripeId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    });

    if (paymentIntent.status === "succeeded") {
      artworkToSell.sold = true;
      artworkToSell.isBidActive = false;
      artworkToSell.bidActivationTime = null;
      artworkToSell.save();

      const sellerEmailBody = stripeEmails.informSellerOfSale(
        seller.fullName,
        artwork,
        artwork.highestBid
      );
      transport.sendMail({
        from: devEmail,
        to: seller.email,
        subject: "Your Artwork Has Been Sold!",
        html: sellerEmailBody,
      });

      const buyerEmailBody = stripeEmails.informBuyerOfSale(
        buyer,
        artwork,
        artwork.highestBid
      );
      transport.sendMail({
        from: devEmail,
        to: buyer.email,
        subject: "Your Purchase Details",
        html: buyerEmailBody,
      });

      const adminEmailBody = adminEmails.informAdminOfSale(
        buyer,
        seller,
        artwork,
        artwork.highestBid
      );
      transport.sendMail({
        from: devEmail,
        to: devEmail,
        subject: "A Transaction Has Been Made",
        html: adminEmailBody,
      });

      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ sucess: false });
    }
  } catch (e) {
    console.log("eor code is: ", e.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
      err.raw.payment_intent.id
    );
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
};
