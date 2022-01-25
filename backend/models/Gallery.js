const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  name: {
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
      ref: "Artwork",
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

const gallery = mongoose.model("gallery", gallerySchema);

module.exports = gallery;
