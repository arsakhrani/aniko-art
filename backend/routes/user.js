const googleClientId = process.env.GOOGLE_AUTH_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
const facebookClientId = process.env.FACEBOOK_AUTH_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_AUTH_CLIENT_SECRET;
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeKey);
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const Artist = require("../models/Artist");
const Gallery = require("../models/Gallery");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "FloatingHeads",
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        user.comparePassword(password, done);
      });
    }
  )
);

passport.use(
  "google-buy",
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "http://localhost:5000/api/user/auth/google/buy/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        return cb(null, existingUser);
      } else {
        const customer = await stripe.customers.create();
        const user = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          googleId: profile.id,
          role: "buyer",
          stripeId: customer.id,
          isVerified: true,
        };
        const newUser = new User(user);
        await newUser.save();
        return cb(null, newUser);
      }
    }
  )
);

passport.use(
  "google-sell-private",
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL:
        "http://localhost:5000/api/user/auth/google/sell/private/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const customer = await stripe.customers.create();
        const user = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          googleId: profile.id,
          role: "seller",
          sellerType: "private",
          stripeId: customer.id,
          isVerified: true,
        };
        const newUser = new User(user);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "google-sell-artist",
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL:
        "http://localhost:5000/api/user/auth/google/sell/artist/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const customer = await stripe.customers.create();
        const user = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          googleId: profile.id,
          role: "seller",
          sellerType: "artist",
          stripeId: customer.id,
          isVerified: true,
        };
        const artist = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
        };
        const newArtist = Artist(artist);
        await newArtist.save();
        const newUser = new User(user);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "google-sell-gallery",
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL:
        "http://localhost:5000/api/user/auth/google/sell/gallery/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const customer = await stripe.customers.create();
        const user = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          googleId: profile.id,
          role: "seller",
          sellerType: "gallery",
          stripeId: customer.id,
          isVerified: true,
        };
        const gallery = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
        };
        const newGallery = Gallery(gallery);
        await newGallery.save();
        const newUser = new User(user);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "facebook-buy",
  new FacebookStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      callbackURL: "http://localhost:5000/api/user/auth/facebook/buy/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        return cb(null, existingUser);
      } else {
        const customer = await stripe.customers.create();
        const user = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          facebookId: profile.id,
          role: "buyer",
          stripeId: customer.id,
          isVerified: true,
        };
        const newUser = new User(user);
        await newUser.save();
        return cb(null, newUser);
      }
    }
  )
);

passport.use(
  "facebook-sell-private",
  new FacebookStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      callbackURL:
        "http://localhost:5000/api/user/auth/facebook/sell/private/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const customer = await stripe.customers.create();
        const user = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          facebookId: profile.id,
          role: "seller",
          sellerType: "private",
          stripeId: customer.id,
          isVerified: true,
        };
        const newUser = new User(user);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "facebook-sell-gallery",
  new FacebookStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      callbackURL:
        "http://localhost:5000/api/user/auth/facebook/sell/gallery/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const customer = await stripe.customers.create();
        const user = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          facebookId: profile.id,
          role: "seller",
          sellerType: "gallery",
          stripeId: customer.id,
          isVerified: true,
        };
        const gallery = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
        };
        const newGallery = Gallery(gallery);
        await newGallery.save();
        const newUser = new User(user);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "facebook-sell-artist",
  new FacebookStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      callbackURL:
        "http://localhost:5000/api/user/auth/facebook/sell/artist/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const customer = await stripe.customers.create();
        const user = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          facebookId: profile.id,
          role: "seller",
          sellerType: "artist",
          stripeId: customer.id,
          isVerified: true,
        };
        const artist = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
        };
        const newArtist = Artist(artist);
        await newArtist.save();
        const newUser = new User(user);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

router.post("/register", wrapAsync(userController.newUser));

router.get("/verify-email/:code", wrapAsync(userController.verifyEmail));

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  wrapAsync(userController.logInUser)
);

router.post(
  "/forgot-password",
  wrapAsync(userController.sendForgotPasswordCode)
);

router.get(
  "/verify-code/:code",
  wrapAsync(userController.verifyForgotPasswordCode)
);

router.put("/update-password", wrapAsync(userController.saveNewPassword));

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(userController.logOutUser)
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(userController.authenticated)
);

router.post(
  "/verify-artist-request/:id",
  wrapAsync(userController.verifyArtistRequest)
);

router.put(
  "/verify-artist-approve/:id",
  wrapAsync(userController.verifyArtistApproval)
);

router.put("/update/:id", wrapAsync(userController.editUser));

router.put("/request-artwork/:id", wrapAsync(userController.requestArtWork));

router.get(
  "/auth/google/buy",
  passport.authenticate("google-buy", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/buy/callback",
  passport.authenticate("google-buy", { session: false }),
  wrapAsync(userController.socialLogin)
);

router.get(
  "/auth/google/sell/private",
  passport.authenticate("google-sell-private", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/sell/private/callback",
  passport.authenticate("google-sell-private", { session: false }),
  wrapAsync(userController.socialLogin)
);

router.get(
  "/auth/google/sell/gallery",
  passport.authenticate("google-sell-gallery", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/sell/gallery/callback",
  passport.authenticate("google-sell-gallery", { session: false }),
  wrapAsync(userController.socialLogin)
);

router.get(
  "/auth/google/sell/artist",
  passport.authenticate("google-sell-artist", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/sell/artist/callback",
  passport.authenticate("google-sell-artist", { session: false }),
  wrapAsync(userController.socialLogin)
);

router.get(
  "/auth/facebook/buy",
  passport.authenticate("facebook-buy", {
    scope: ["email"],
    session: false,
  })
);

router.get(
  "/auth/facebook/buy/callback",
  passport.authenticate("facebook-buy", { session: false }),
  wrapAsync(userController.socialLogin)
);

router.get(
  "/auth/facebook/sell/private",
  passport.authenticate("facebook-sell-private", {
    scope: ["email"],
    session: false,
  })
);

router.get(
  "/auth/facebook/sell/private/callback",
  passport.authenticate("facebook-sell-private", { session: false }),
  wrapAsync(userController.socialLogin)
);

router.get(
  "/auth/facebook/sell/gallery",
  passport.authenticate("facebook-sell-gallery", {
    scope: ["email"],
    session: false,
  })
);

router.get(
  "/auth/facebook/sell/gallery/callback",
  passport.authenticate("facebook-sell-gallery", { session: false }),
  wrapAsync(userController.socialLogin)
);

router.get(
  "/auth/facebook/sell/artist",
  passport.authenticate("facebook-sell-artist", {
    scope: ["email"],
    session: false,
  })
);

router.get(
  "/auth/facebook/sell/artist/callback",
  passport.authenticate("facebook-sell-artist", { session: false }),
  wrapAsync(userController.socialLogin)
);

module.exports = router;
