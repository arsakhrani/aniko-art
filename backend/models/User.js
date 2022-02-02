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
    type: String,
  },
  shippingAddress: {
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    postCode: {
      type: String,
      default: "",
    },
    specialInstructions: {
      type: String,
      default: "",
    },
  },
  password: {
    type: String,
    required: true,
  },
  insuranceMethod: {
    type: String,
    enum: ["AXA", "LOREM", "IPSUM", "HAVE-NONE", "NONE-NEEDED", ""],
  },
  favoriteMedium: {
    painting: {
      type: Boolean,
      default: false,
    },
    sculpture: {
      type: Boolean,
      default: false,
    },
    drawing: {
      type: Boolean,
      default: false,
    },
    prints: {
      type: Boolean,
      default: false,
    },
    workOnPaper: {
      type: Boolean,
      default: false,
    },
    design: {
      type: Boolean,
      default: false,
    },
    photography: {
      type: Boolean,
      default: false,
    },
    installation: {
      type: Boolean,
      default: false,
    },
    filmVideo: {
      type: Boolean,
      default: false,
    },
  },
  favoriteArtist: {
    fullName: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },
  favoriteStyle: {
    style: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    aesthetics: {
      type: String,
      default: "",
    },
    material: {
      type: String,
      default: "",
    },
    other: {
      type: String,
      default: "",
    },
  },
  requestedArtWork: {
    type: [
      {
        artist: String,
        country: String,
        style: String,
        size: String,
        aethetics: String,
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
    partnerSales: {
      type: Boolean,
      default: false,
    },
    gallerySales: {
      type: Boolean,
      default: false,
    },
    artistSales: {
      type: Boolean,
      default: false,
    },
  },
  sellerType: {
    type: String,
    enum: ["partner", "artist", "gallery", ""],
    default: "",
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
  isVerifiedWithId: {
    type: Boolean,
    default: true,
  },
  taxNumber: {
    type: String,
  },
  website: {
    type: String,
  },
  stripeId: {
    type: String,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  soundDescription: {
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
  featurePicture: {
    type: String,
  },
  birthCity: {
    type: String,
  },
  birthCountry: {
    type: String,
  },
  birthYear: {
    type: Number,
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
