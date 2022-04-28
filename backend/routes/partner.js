const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const partnerController = require("../controllers/partner");

router.get("/get-all", wrapAsync(partnerController.getAllPartners));

router.get("/get-admin", wrapAsync(partnerController.getAdminPartners));

router.put("/edit", wrapAsync(partnerController.editPartner));

router.put("/edit-admin/:id", wrapAsync(partnerController.adminEditPartner));

router.delete(
  "/delete-admin/:id",
  wrapAsync(partnerController.adminDeletePartner)
);

router.post("/add", wrapAsync(partnerController.adminAddPartner));

module.exports = router;
