const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/user");
const passport = require("passport");
const passportConfig = require("../utils/passport");
const JWT = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
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

router.put("", wrapAsync(userController.editUser));

router.delete("", wrapAsync(userController.deleteUser));

router.get("/:id", wrapAsync(userController.getUserInfo));

//router.get('/confirm-email/:id', wrapAsync(userController.confirmEmail));

//router.get('/confirm-phone/:id', wrapAsync(userController.conformPhone));

//router.post('/forgotpassword', wrapAsync(userController.sendForgotPasswordCode));

//router.get('/reset/:code', wrapAsync(userController.verifyForgotPasswordCode));

//router.put('/updatepassword', wrapAsync(userController.saveNewPassword));

module.exports = router;
