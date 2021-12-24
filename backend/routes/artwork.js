const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const artworkController = require("../controllers/artwork");

router.post("/upload", wrapAsync(artworkController.uploadArt));

router.get("/get-all", wrapAsync(artworkController.getAllArt));

router.put("/set-new-bid", wrapAsync(artworkController.setNewBid));

router.delete("/:id", wrapAsync(artworkController.deleteArt));

module.exports = router;
