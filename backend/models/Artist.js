const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  birthCity: {
    type: String,
  },
  birthCountry: {
    type: String,
  },
  birthYear: {
    type: Number,
  },
  currentCity: {
    type: String,
  },
  currentCountry: {
    type: String,
  },
  fullName: {
    type: String,
  },
  website: {
    type: String,
  },
  soundDescription: {
    type: String,
  },
  email: {
    type: String,
  },
  bannerPicture: {
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
  featurePicture: {
    type: String,
  },
});

const artist = mongoose.model("artist", artistSchema);

module.exports = artist;
