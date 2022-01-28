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
  highestBid: {
    type: Number,
    default: 0,
  },
  bidIncrement: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  saleProcessed: {
    type: Boolean,
    default: false,
  },
  saleTime: {
    type: Date || null,
    default: null,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  highestBidHolder: {
    type: mongoose.Schema.Types.ObjectId || null,
    ref: "User",
    default: null,
  },
  bidActivationTime: {
    type: Date || null,
    default: null,
  },
  isBidActive: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const artwork = mongoose.model("artwork", artworkSchema);

module.exports = artwork;
