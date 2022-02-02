const sendgridKey = process.env.TWILIO_SENDGRID_KEY;
const stripeKey = process.env.STRIPE_SECRET_KEY;
const devEmail = process.env.DEV_EMAIL;
const clientRootDomain = process.env.ROOT_DOMAIN_CLIENT;
const serverRootDomain = process.env.ROOT_DOMAIN_SERVER;
const stripe = require("stripe")(stripeKey);
const User = require("../models/User");
const Artist = require("../models/Artist");
const Gallery = require("../models/Gallery");
const Partner = require("../models/Partner");
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
        website: user.website,
        soundDescription: user.soundDescription,
        bannerPicture: user.bannerPicture,
        audioFile: user.audioFile,
        cvFile: user.cvFile,
        cvFileName: user.cvFileName,
        featurePicture: user.featurePicture,
        birthCity: user.birthCity,
        birthCountry: user.birthCountry,
        birthYear: user.birthYear,
      };
      const newArtist = new Artist(artist);
      await newArtist.save();
      newUser.isVerifiedWithId = false;
    }

    const galleryOrPartner = {
      email: user.email,
      fullName: user.fullName,
      country: user.shippingAddress ? user.shippingAddress.country : "",
      city: user.shippingAddress ? user.shippingAddress.city : "",
      website: user.website,
      featurePicture: user.featurePicture,
    };

    if (user.sellerType === "gallery") {
      const newGallery = new Gallery(galleryOrPartner);
      await newGallery.save();
    }

    if (user.sellerType === "partner") {
      const newPartner = new Partner({
        ...galleryOrPartner,
      });
      await newPartner.save();
      newUser.isVerifiedWithId = false;
    }

    if (newUser.isVerifiedWithId === false) {
      const approveLink = `${serverRootDomain}/api/user/verify-id/${newUser._id}`;
      const declineLink = `${serverRootDomain}/api/user/decline-id/${newUser._id}`;
      const emailBody = adminEmails.verifyId(newUser, approveLink, declineLink);
      transport.sendMail({
        to: devEmail,
        from: devEmail,
        subject: `Verify User (${newUser.sellerType}) ID`,
        html: emailBody,
      });
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
  const updatedUser = await User.findByIdAndUpdate(id, user);

  if (updatedUser) {
    const galleryOrPartner = {
      fullName: updatedUser.fullName,
      country: updatedUser.shippingAddress
        ? updatedUser.shippingAddress.country
        : "",
      city: updatedUser.shippingAddress ? updatedUser.shippingAddress.city : "",
      website: updatedUser.website,
      featurePicture: updatedUser.featurePicture,
    };

    if (updatedupdatedUser.sellerType === "gallery") {
      await Gallery.findOneAndUpdate({ email: updatedUser.email }, updatedUser);
    }

    if (updatedUser.sellerType === "partner") {
      await Partner.findOneAndUpdate({ email: updatedUser.email }, updatedUser);
    }

    if (updatedUser.sellerType === "artist") {
      const artist = {
        fullName: updatedUser.fullName,
        currentCountry: updatedUser.shippingAddress
          ? updatedUser.shippingAddress.country
          : "",
        currentCity: updatedUser.shippingAddress
          ? updatedUser.shippingAddress.city
          : "",
        website: updatedUser.website,
        soundDescription: updatedUser.soundDescription,
        bannerPicture: updatedUser.bannerPicture,
        audioFile: updatedUser.audioFile,
        cvFile: updatedUser.cvFile,
        cvFileName: updatedUser.cvFileName,
        featurePicture: updatedUser.featurePicture,
        birthCity: updatedUser.birthCity,
        birthCountry: updatedUser.birthCountry,
        birthYear: updatedUser.birthYear,
      };
      await Artist.findOneAndUpdate({ email: updatedUser.email }, artist);
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

module.exports.declineIdApproval = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (user) {
    if (user.sellerType === "partner") {
      await Partner.findOneAndDelete({ email: user.email });
    }

    if (user.sellerType === "artist") {
      await Artist.findOneAndDelete({ email: user.email });
    }

    const emailBody = authEmails.verifyIdDeclined(user.fullName);
    transport.sendMail({
      from: devEmail,
      to: user.email,
      subject: `Verification Request Denied`,
      html: emailBody,
    });

    res.status(200).send("User Deleted");
  } else {
    res.status(400).send("Failed");
  }
};

module.exports.verifyIdApproval = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    user.isVerifiedWithId = true;
    await user.save();

    const emailBody = authEmails.verifyIdApproved(user.fullName);
    transport.sendMail({
      from: devEmail,
      to: user.email,
      subject: `Verification Request Approved`,
      html: emailBody,
    });

    res.status(200).send("Id successfully approved");
  } else {
    res.status(400).send("Failed");
  }
};
