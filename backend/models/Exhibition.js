const mongoose = require("mongoose");

const exhibitionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: Number,
  },
  type: {
    type: String,
  },
  country: {
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
