const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const artistController = require("../controllers/artist");

router.get("/get-all", wrapAsync(artistController.getAllArtists));

router.put("/edit/:id", wrapAsync(artistController.editArtist));

module.exports = router;
