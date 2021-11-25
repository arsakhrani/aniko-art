const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  birthCity: {
    type: String,
  },
  birthCountry: {
    type: String,
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
  email: {
    type: String,
  },
  bannerPicture: {
    type: String,
    default: "a picture",
  },
  artworks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  activated: {
    type: Boolean,
    default: false,
  },
});

const artist = mongoose.model("artist", artistSchema);

module.exports = artist;
