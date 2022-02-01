const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const partnerController = require("../controllers/partner");

router.get("/get-all", wrapAsync(partnerController.getAllPartners));

router.put("/edit", wrapAsync(partnerController.editPartner));

module.exports = router;
