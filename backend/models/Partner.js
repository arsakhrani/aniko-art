const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  fullName: {
    type: String,
  },
  website: {
    type: String,
  },
  email: {
    type: String,
  },
  featurePicture: {
    type: String,
  },
  artworks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artwork",
    },
  ],
  affiliatedArtists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artist",
    },
  ],
  activated: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const partner = mongoose.model("partner", partnerSchema);

module.exports = partner;
