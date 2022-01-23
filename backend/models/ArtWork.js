const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  artist: {
    type: String,
  },
  gallery: {
    type: String,
  },
  year: {
    type: Number,
  },
  title: {
    type: String,
  },
  country: {
    type: String,
  },
  price: {
    type: Number,
  },
  pictures: {
    type: [String],
  },
  certificateOfAuthenticity: {
    type: [String],
  },
  lot: {
    type: Number,
  },
  medium: {
    type: String,
  },
  dimensionsIn: {
    length: {
      type: Number || String,
    },
    width: {
      type: Number || String,
    },
    depth: {
      type: Number || String,
    },
  },
  dimensionsCm: {
    length: {
      type: Number || String,
    },
    width: {
      type: Number || String,
    },
    depth: {
      type: Number || String,
    },
  },
  size: {
    type: Number,
  },
  minimumBid: {
    type: Number,
    default: 0,
  },
  bidHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sold: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  highestBidHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const artwork = mongoose.model("artwork", artworkSchema);

module.exports = artwork;
