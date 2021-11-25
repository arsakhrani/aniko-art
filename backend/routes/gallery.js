const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const galleryController = require("../controllers/gallery");

router.get("/get-all", wrapAsync(galleryController.getAllGalleries));

router.put("/edit", wrapAsync(galleryController.editGallery));

module.exports = router;
