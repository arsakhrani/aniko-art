const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
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
  activated: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  taxNumber: {
    type: String,
  },
});

const gallery = mongoose.model("gallery", gallerySchema);

module.exports = gallery;
