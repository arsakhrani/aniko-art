const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const galleryController = require("../controllers/gallery");

router.get("/get-all", wrapAsync(galleryController.getAllGalleries));

router.get("/get-admin", wrapAsync(galleryController.getAdminGalleries));

router.put("/edit", wrapAsync(galleryController.editGallery));

router.put("/edit-admin/:id", wrapAsync(galleryController.adminEditGallery));

router.delete(
  "/delete-admin/:id",
  wrapAsync(galleryController.adminDeleteGallery)
);

router.post("/add", wrapAsync(galleryController.adminAddGallery));

module.exports = router;
