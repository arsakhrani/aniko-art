const sendgridKey = process.env.TWILIO_SENDGRID_KEY;
const devEmail = process.env.DEV_EMAIL;
const Artwork = require("../models/Artwork");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const stripeEmails = require("../controllers/email-tamplates/stripeEmails");
const adminEmails = require("../controllers/email-tamplates/adminEmails");

const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendgridKey,
    },
  })
);

module.exports.processPurchases = async () => {
  const artworks = Artwork.find({ sold: true, isProcessed: false });
  if (artworks.length) {
    for (const artwork of artworks) {
      if (artwork.saleTime + 3600000 < Date.now()) {
        const buyer = await User.findById(artwork.buyer);
        artwork.isProcessed = true;

        const buyerEmailBody = stripeEmails.informBuyerOfSaleProcess();
        transport.sendMail({
          from: devEmail,
          to: buyer.email,
          subject: "Your Order is being processed",
          html: buyerEmailBody,
        });

        const adminEmailBody = adminEmails.informAdminOfSaleProcess();
        transport.sendMail({
          from: devEmail,
          to: devEmail,
          subject: "Order is ready for processing",
          html: adminEmailBody,
        });
      }
    }
  }
};

module.exports.expireActiveBids = async () => {
  const artworks = Artwork.find({ isBidActive: true, sold: false });
  if (artworks.length) {
    for (const artwork of artworks) {
      if (artwork.bidActivationTime + 259200000 < Date.now()) {
        const bidHolder = await User.findById(artwork.highestBidHolder);
        const artOwner = await User.findById(artwork.owner);

        artwork.highestBid = 0;
        artwork.isBidActive = true;
        artwork.highestBidHolder = null;
        artwork.bidActivationTime = null;

        const bidderEmailBody = stripeEmails.informBidderOfCanceledBid(
          bidHolder.fullName,
          artwork
        );
        transport.sendMail({
          from: devEmail,
          to: bidHolder.email,
          subject: "Your Bid Was Not Accepted",
          html: bidderEmailBody,
        });

        const adminEmailBody = adminEmails.informAdminOfCanceledBid(
          bidHolder,
          artOwner,
          artwork
        );
        transport.sendMail({
          from: devEmail,
          to: devEmail,
          subject: "A Bid Was Not Accepted",
          html: adminEmailBody,
        });

        await artwork.save();
      }
    }
  }
};
