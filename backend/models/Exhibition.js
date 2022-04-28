const mongoose = require("mongoose");

const exhibitionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  type: {
    type: String,
  },
  country: {
    type: String,
  },
  website: {
    type: String,
  },
  pictures: [String],
  created: {
    type: Date,
    default: Date.now(),
  },
});

const exhibition = mongoose.model("exhibition", exhibitionSchema);

module.exports = exhibition;
