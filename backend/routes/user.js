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
        };
        const newUser = new User(user);
        const savedUser = await newUser.save();
        return cb(null, savedUser);
      }
    }
  )
);

passport.use(
  "google-sell",
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "http://localhost:5000/api/user/auth/google/sell/callback",
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
        };
        const newUser = await User.save(user);
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
        };
        const newUser = new User(user);
        const savedUser = await newUser.save();
        return cb(null, savedUser);
      }
    }
  )
);

passport.use(
  "facebook-sell",
  new FacebookStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      callbackURL: "http://localhost:5000/api/user/auth/facebook/sell/callback",
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
        };
        const newUser = await User.save(user);
        done(null, newUser);
      }
    }
  )
);

router.post("/register", wrapAsync(userController.newUser));

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  wrapAsync(userController.logInUser)
);

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
  "/auth/google/sell",
  passport.authenticate("google-sell", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/sell/callback",
  passport.authenticate("google-sell", { session: false }),
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
  "/auth/facebook/sell",
  passport.authenticate("facebook-sell", {
    scope: ["email"],
    session: false,
  })
);

router.get(
  "/auth/facebook/sell/callback",
  passport.authenticate("facebook-sell", { session: false }),
  wrapAsync(userController.socialLogin)
);

// router.get("/:id", wrapAsync(userController.getUserInfo));

//router.get('/confirm-email/:id', wrapAsync(userController.confirmEmail));

//router.get('/confirm-phone/:id', wrapAsync(userController.conformPhone));

//router.post('/forgotpassword', wrapAsync(userController.sendForgotPasswordCode));

//router.get('/reset/:code', wrapAsync(userController.verifyForgotPasswordCode));

//router.put('/updatepassword', wrapAsync(userController.saveNewPassword));

module.exports = router;
