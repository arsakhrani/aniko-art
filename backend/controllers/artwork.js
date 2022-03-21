const sendgridKey = process.env.TWILIO_SENDGRID_KEY;
const devEmail = process.env.DEV_EMAIL;
const Artwork = require("../models/Artwork");
const User = require("../models/User");
const Artist = require("../models/Artist");
const Gallery = require("../models/Gallery");
const Partner = require("../models/Partner");
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
  if (newArtwork.price < 1001) {
    newArtwork.bidIncrement = 125;
  } else if (newArtwork.price < 4001) {
    newArtwork.bidIncrement = 250;
  } else if (newArtwork.price < 50001) {
    newArtwork.bidIncrement = 500;
  } else {
    newArtwork.bidIncrement = 1000;
  }
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

  if (user.sellerType === "partner") {
    const partner = await Partner.findOne({ email: user.email });
    partner.artworks.push(newArtwork._id);

    const partneredArtist = new Artist({
      email: user.email,
      fullName: artwork.artist,
      birthCountry: artwork.country,
    });
    partneredArtist.artworks.push(newArtwork._id);
    await partneredArtist.save();

    partner.affiliatedArtists.push(partneredArtist._id);
    await partner.save();
  }

  res.status(200).json({ success: true, uploadedArtwork: newArtwork });
};

module.exports.getAllArt = async (req, res) => {
  const artworks = await Artwork.find({ sold: false }).sort({ created: -1 });
  res.status(200).json({ artworks });
};

module.exports.setNewBid = async (req, res) => {
  const { artworkId, highestBid, userId } = req.body;
  const artwork = await Artwork.findById(artworkId);
  const buyer = await User.findById(userId);
  const seller = await User.findById(artwork.owner);

  if (highestBid > artwork.highestBid) {
    if (artwork.highestBidHolder) {
      const oldBidHolder = await User.findById(artwork.highestBidHolder);
      const oldBidHolderEmail = stripeEmails.informOldBidHolder(
        oldBidHolder.fullName,
        highestBid,
        artwork
      );
      transport.sendMail({
        from: devEmail,
        to: oldBidHolder.email,
        subject: "You Have Been Outbid!",
        html: oldBidHolderEmail,
      });
    } else {
      artwork.bidActivationTime = Date.now();
      artwork.isBidActive = true;
    }

    artwork.highestBid = highestBid;
    artwork.highestBidHolder = userId;
    artwork.save();

    const sellerEmailBody = stripeEmails.setNewBidSeller(
      seller.fullName,
      highestBid,
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
      highestBid,
      artwork
    );
    transport.sendMail({
      from: devEmail,
      to: buyer.email,
      subject: "Your Bid Confirmation",
      html: buyerEmailBody,
    });

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
    artwork.saleTime = Date.now();
    artwork.buyer = buyerId;
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

module.exports.chatRequest = async (req, res, next) => {
  const { buyerId, sellerId } = req.body;
  const buyer = await User.findById(buyerId);
  const seller = await User.findById(sellerId);

  const adminEmailBody = adminEmails.chatRequest(buyer, seller);

  transport.sendMail({
    from: devEmail,
    to: devEmail,
    subject: "A Chat Request Has Been Made",
    html: adminEmailBody,
  });

  res.status(200).json({ success: true });
};

module.exports.deleteArt = async (req, res, next) => {
  const { id } = req.params;
  const artwork = await Artwork.findByIdAndDelete(id);
  //send emails to affected parties.
  //remove from artwork list of artist.
  res.status(200).json({ success: true });
};
