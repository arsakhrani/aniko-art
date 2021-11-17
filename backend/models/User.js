const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  shippingAddress: {
    street: String,
    city: String,
    country: String,
    postCode: String,
    specialInstructions: String,
  },
  password: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["VISA/DELTA/ELECTRON", "MASTERCARD/EUROCARD", "OTHER", ""],
  },
  insuranceMethod: {
    type: String,
    enum: ["AXA", "LOREM", "IPSUM", "HAVE-NONE", "NONE-NEEDED", ""],
  },
  profilePicture: {
    type: String,
  },
  favoriteMedium: {
    type: [String],
  },
  favoriteArtist: {
    fullName: String,
    country: String,
  },
  favoriteStyle: {
    style: String,
    size: String,
    aesthetic: String,
    material: String,
    other: String,
  },
  requestedArtWork: {
    type: [
      {
        artist: String,
        country: String,
        style: String,
        size: String,
        aethetic: String,
        material: String,
        other: String,
      },
    ],
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
  },
  interests: {
    privateSales: Boolean,
    gallerySales: Boolean,
    artistSales: Boolean,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  idPicture: {
    type: String,
  },
  facePicture: {
    type: String,
  },
  taxNumber: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
