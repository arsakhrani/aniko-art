const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeKey);
const User = require("../models/User");
const Artist = require("../models/Artist");
const Gallery = require("../models/Gallery");
const JWT = require("jsonwebtoken");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "FloatingHeads",
      sub: userID,
    },
    "FloatingHeads",
    { expiresIn: "14d" }
  );
};

module.exports.newUser = async (req, res) => {
  try {
    const user = req.body;
    const emailCheck = await User.findOne({ email: user.email });
    if (emailCheck) {
      res
        .status(401)
        .json({ message: { msgBody: "Email is taken", msgError: true } });
    } else {
      const newUser = new User(user);
      const customer = await stripe.customers.create();
      newUser.stripeId = customer.id;

      if (user.sellerType === "artist") {
        const artist = {
          fullName: user.fullName,
          email: user.email,
          currentCountry: user.shippingAddress
            ? user.shippingAddress.country
            : "",
          currentCity: user.shippingAddress ? user.shippingAddress.city : "",
        };
        const newArtist = new Artist(artist);
        await newArtist.save();
      }

      if (user.sellerType === "gallery") {
        const gallery = {
          email: user.email,
          name: user.fullName,
          country: user.shippingAddress ? user.shippingAddress.country : "",
          city: user.shippingAddress ? user.shippingAddress.city : "",
        };
        const newGallery = new Gallery(gallery);
        await newGallery.save();
      }

      await newUser.save(() => {
        const token = signToken(newUser._id);
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.status(201).json({ user: newUser, isAuthenticated: true });
      });
    }
  } catch (e) {
    res.status(400).json({
      message: { msgBody: "An error has occured", msgError: true },
    });
  }
};

module.exports.logInUser = async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const token = signToken(user._id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({
      isAuthenticated: true,
      user,
    });
  }
};

module.exports.socialLogin = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = req.user;
      const token = signToken(user._id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.redirect("http://localhost:3000/discover/artworks");
    }
  } catch (e) {
    res.redirect("http://localhost:3000/error"); //make error page
  }
};

module.exports.logOutUser = async (req, res) => {
  res.clearCookie("access_token");
  res.json({
    user: {},
    success: true,
  });
};

module.exports.authenticated = async (req, res) => {
  const user = req.user;
  res.status(200).json({ isAuthenticated: true, user });
};

module.exports.editUser = async (req, res, next) => {
  const { id } = req.params;
  const user = req.body;
  await User.findByIdAndUpdate(id, user);
  const updatedUser = await User.findById(id);

  if (updatedUser.sellerType === "gallery") {
    const formattedUser = {
      city: user.shippingAddress.city,
      country: user.shippingAddress.country,
      name: user.fullName,
      website: user.website,
    };
    await Gallery.findOneAndUpdate({ email: updatedUser.email }, formattedUser);
  }

  if (updatedUser.sellerType === "artist") {
    await Artist.findOneAndUpdate({ email: updatedUser.email }, user);
  }

  res.status(201).json({ user: updatedUser, isAuthenticated: true });
};

module.exports.requestArtWork = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = req.body;
    const user = await User.findById(id);
    user.requestedArtWork.push(request);
    await user.save(); //should send email with nodemailer here
    res.status(201).json({ success: true });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

module.exports.verifyArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idUrl = req.body;
    const user = await User.findById(id);
    //should send email idUrl and user details with nodemailer here
    res.status(201).json({ success: true });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};
