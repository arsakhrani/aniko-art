const Artwork = require("../models/Artwork");
const User = require("../models/User");
const Artist = require("../models/Artist");
const Gallery = require("../models/Gallery");

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

  res.status(201).json({ success: true, uploadedArtwork: newArtwork });
};

module.exports.getAllArt = async (req, res) => {
  const artworks = await Artwork.find({ sold: false }).sort({ created: -1 });
  res.status(200).json({ artworks });
};

module.exports.setNewBid = async (req, res) => {
  const { artworkId, minimumBid, userId } = req.body;
  const artwork = await Artwork.findById(artworkId);
  if (minimumBid > artwork.minimumBid) {
    artwork.minimumBid = minimumBid;
    artwork.highestBidHolder = userId;
    artwork.save();
    res.status(200).send({ success: true });
  } else {
    res.status(401).send({ message: "Something went wrong!" });
  }
};

module.exports.deleteArt = async (req, res, next) => {
  const { id } = req.params;
  const artwork = await Artwork.findByIdAndDelete(id);
  if (artwork) {
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }
};
