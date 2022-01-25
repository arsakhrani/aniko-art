const mongoose = require("mongoose");

const secretCodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  code: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    expires: 86400000,
  },
});

const SecretCode = mongoose.model("SecretCode", secretCodeSchema);

module.exports = SecretCode;
