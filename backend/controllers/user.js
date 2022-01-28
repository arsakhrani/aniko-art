const sendgridKey = process.env.TWILIO_SENDGRID_KEY;
const stripeKey = process.env.STRIPE_SECRET_KEY;
const devEmail = process.env.DEV_EMAIL;
const clientRootDomain = process.env.ROOT_DOMAIN_CLIENT;
const serverRootDomain = process.env.ROOT_DOMAIN_SERVER;
const stripe = require("stripe")(stripeKey);
const User = require("../models/User");
const Artist = require("../models/Artist");
const Gallery = require("../models/Gallery");
const SecretCode = require("../models/SecretCode");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const authEmails = require("./email-tamplates/authEmails");
const adminEmails = require("./email-tamplates/adminEmails");

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

const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendgridKey,
    },
  })
);

module.exports.newUser = async (req, res) => {
  const user = req.body;
  const emailCheck = await User.findOne({ email: user.email });
  if (emailCheck) {
    res.status(401).json({ message: "Email is taken", success: false });
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

    await newUser.save();

    const code = crypto.randomBytes(16).toString("hex");
    const secret = new SecretCode({ user: registeredUser._id, code });
    const secretCode = await secret.save();
    const verificationLink = `${serverRootDomain}/api/user/verify-email/${secretCode.code}`;
    const emailBody = authEmails.verifyEmail(user.fullName, verificationLink);
    transport.sendMail({
      to: user.email,
      from: devEmail,
      subject: "Verify Email",
      html: emailBody,
    });

    const token = signToken(newUser._id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ user: newUser, isAuthenticated: true });
  }
};

module.exports.verifyEmail = async (req, res, next) => {
  const { code } = req.params;
  const secret = await SecretCode.findOne({ code });
  if (secret) {
    const user = await User.findById(secret.user);
    user.isVerified = true;
    await user.save();
    res.redirect(`${clientRootDomain}/?isVerified=true`);
  } else {
    res.redirect(`${clientRootDomain}/?isVerified=false`);
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
      success: true,
    });
  } else {
    res.status(401).json({
      isAuthenticated: false,
      user: {},
      success: false,
    });
  }
};

module.exports.sendForgotPasswordCode = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const code = crypto.randomBytes(20).toString("hex");
    const secret = new SecretCode({ user: user._id, code });
    const secretCode = await secret.save();
    const forgotPasswordLink = `${clientRootDomain}/password-reset/${secretCode.code}`;
    const emailBody = authEmails.forgotPassword(
      user.fullName,
      forgotPasswordLink
    );
    transport.sendMail({
      from: devEmail,
      to: user.email,
      subject: "Aniko van Nie Art Agency Password Reset",
      html: emailBody,
    });
    res.status(200).json({ success: true });
  } else {
    res.status(403).json({ success: false });
  }
};

module.exports.verifyForgotPasswordCode = async (req, res, next) => {
  const { code } = req.params;
  const secret = await SecretCode.findOne({ code });
  if (secret) {
    const user = await User.findById(secret.user);
    res.json({ success: true, email: user.email });
  } else {
    res.status(403).send({ success: false });
  }
};

module.exports.saveNewPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    await user.setPassword(password);
    await user.save();
    const token = signToken(user._id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ user, isAuthenticated: true, success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.socialLogin = async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const token = signToken(user._id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.redirect(`${clientRootDomain}/discover/artworks`);
  } else {
    res.redirect(`${clientRootDomain}/`);
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

  if (updatedUser) {
    if (updatedUser.sellerType === "gallery") {
      const formattedUser = {
        city: user.shippingAddress.city,
        country: user.shippingAddress.country,
        name: user.fullName,
        website: user.website,
      };
      await Gallery.findOneAndUpdate(
        { email: updatedUser.email },
        formattedUser
      );
    }

    if (updatedUser.sellerType === "artist") {
      await Artist.findOneAndUpdate({ email: updatedUser.email }, user);
    }

    res.status(200).json({ user: updatedUser, isAuthenticated: true });
  } else {
    res.status(401).json({ isAuthenticated: false, user: null });
  }
};

module.exports.requestArtWork = async (req, res, next) => {
  const { id } = req.params;
  const request = req.body;
  const user = await User.findById(id);
  if (user) {
    user.requestedArtWork.push(request);
    await user.save();

    const emailBody = adminEmails.requestedArt(
      user.fullName,
      request,
      user.email
    );
    transport.sendMail({
      from: devEmail,
      to: devEmail,
      subject: `Artwork Request from ${user.fullName}`,
      html: emailBody,
    });

    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.verifyArtistRequest = async (req, res, next) => {
  const { id } = req.params;
  const { idPicUrl, facePicUrl } = req.body;
  const user = await User.findById(id);
  if (user && idPicUrl && facePicUrl) {
    user.idPicture = idPicUrl;
    user.facePicUrl = facePicUrl;
    await user.save();

    const link = `${serverRootDomain}/api/user/verify-artist-approve/${user._id}`;

    const emailBody = adminEmails.verifyArtistRequest(
      user.fullName,
      user.email,
      idPicUrl,
      facePicUrl,
      link
    );
    transport.sendMail({
      from: devEmail,
      to: devEmail,
      subject: `Verify Artist Request from ${user.fullName}`,
      html: emailBody,
    });
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.verifyArtistApproval = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    user.isVerifiedWithId = true;
    await user.save();

    const emailBody = authEmails.verifyArtistApproved(user.fullName);
    transport.sendMail({
      from: devEmail,
      to: user.email,
      subject: `Verification Request Approved`,
      html: emailBody,
    });

    res.status(200).send("Success");
  } else {
    res.status(400).send("Failed");
  }
};
