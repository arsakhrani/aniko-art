const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const artworkController = require("../controllers/artwork");

router.post("/upload", wrapAsync(artworkController.uploadArt));

router.get("/get-all", wrapAsync(artworkController.getAllArt));

router.put("/edit", wrapAsync(artworkController.editArt));

router.delete("", wrapAsync(artworkController.deleteArt));

module.exports = router;
