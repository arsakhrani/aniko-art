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
  audioFile: {
    type: String,
  },
  cvFile: {
    type: String,
  },
  cvFileName: {
    type: String,
  },
  artworks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artwork",
    },
  ],
  exhibitions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exhibition",
    },
  ],
  activated: {
    type: Boolean,
    default: true,
  },
  featurePicture: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const artist = mongoose.model("artist", artistSchema);

module.exports = artist;
