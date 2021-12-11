require("dotenv").config();
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const stripeController = require("../controllers/stripe");

router.post(
  "/create-checkout-buy-session",
  wrapAsync(stripeController.createCheckoutBuySession)
);

router.post(
  "/create-checkout-save-session",
  wrapAsync(stripeController.createCheckoutSaveSession)
);

module.exports = router;
