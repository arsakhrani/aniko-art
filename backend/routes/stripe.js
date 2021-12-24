const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const stripeController = require("../controllers/stripe");

router.post(
  "/create-checkout-buy-session",
  wrapAsync(stripeController.createCheckoutBuySession)
);

router.get(
  "/create-checkout-save-session/:userId",
  wrapAsync(stripeController.createCheckoutSaveSession)
);

module.exports = router;
