const sendgridKey = process.env.TWILIO_SENDGRID_KEY;
const devEmail = process.env.DEV_EMAIL;
const Artwork = require("../models/Artwork");
const User = require("../models/User");
const Artist = require("../models/Artist");
const Gallery = require("../models/Gallery");
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

module.exports.uploadArt = async (req, res) => {
  const artwork = req.body;
  const newArtwork = new Artwork(artwork);
  newArtwork.size = artwork.dimensionsCm.length * artwork.dimensionsCm.width;
  const number = await Artwork.countDocuments();
  newArtwork.lot = number + 1;
  await newArtwork.save();

  const user = await User.findById(artwork.owner);
  if (user.sellerType === "artist") {
    const artist = await Artist.findOne({ email: user.email });
    artist.artworks.push(newArtwork._id);
    await artist.save();
  }

  if (user.sellerType === "gallery") {
    const gallery = await Gallery.findOne({ email: user.email });
    gallery.artworks.push(newArtwork._id);
    await gallery.save();
  }

  res.status(200).json({ success: true, uploadedArtwork: newArtwork });
};

module.exports.getAllArt = async (req, res) => {
  const artworks = await Artwork.find({ sold: false }).sort({ created: -1 });
  res.status(200).json({ artworks });
};

module.exports.setNewBid = async (req, res) => {
  const { artworkId, minimumBid, userId } = req.body;
  const artwork = await Artwork.findById(artworkId);
  const buyer = await User.findById(userId);
  const seller = await User.findById(artwork.owner);
  const oldBidHolder = await User.findById(artwork.highestBidHolder);

  if (minimumBid > artwork.minimumBid) {
    artwork.minimumBid = minimumBid;
    artwork.highestBidHolder = userId;
    artwork.save();

    const sellerEmailBody = stripeEmails.setNewBidSeller(
      seller.fullName,
      minimumBid,
      artwork
    );
    transport.sendMail({
      from: devEmail,
      to: seller.email,
      subject: "New Bid On Your Artwork!",
      html: sellerEmailBody,
    });

    const buyerEmailBody = stripeEmails.setNewBidBuyer(
      buyer.fullName,
      minimumBid,
      artwork
    );
    transport.sendMail({
      from: devEmail,
      to: buyer.email,
      subject: "Your Bid Confirmation",
      html: buyerEmailBody,
    });

    if (oldBidHolder) {
      const oldBidHolderEmail = stripeEmails.informOldBidHolder(
        oldBidHolder.fullName,
        minimumBid,
        artwork
      );
      transport.sendMail({
        from: devEmail,
        to: oldBidHolder.email,
        subject: "You Have Been Outbid!",
        html: oldBidHolderEmail,
      });
    }

    res.status(200).json({ success: true, artwork });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.finalizeSale = async (req, res) => {
  const { artworkId, buyerId } = req.body;
  const artwork = await Artwork.findById(artworkId);
  const buyer = await User.findById(buyerId);
  const seller = await User.findById(artwork.owner);

  if (artwork && buyer && seller) {
    artwork.sold = true;
    artwork.save();

    const sellerEmailBody = stripeEmails.informSellerOfSale(
      seller.fullName,
      artwork,
      artwork.price
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
      artwork.price
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
      artwork.price
    );
    transport.sendMail({
      from: devEmail,
      to: devEmail,
      subject: "A Transaction Has Been Made",
      html: adminEmailBody,
    });

    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.deleteArt = async (req, res, next) => {
  const { id } = req.params;
  const artwork = await Artwork.findByIdAndDelete(id);
  res.status(200).json({ success: true });
};
