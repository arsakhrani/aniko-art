const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const artistController = require("../controllers/artist");

router.get("/get-all", wrapAsync(artistController.getAllArtists));

router.get("/get-admin", wrapAsync(artistController.getAdminArtists));

router.put("/edit/:id", wrapAsync(artistController.editArtist));

router.put("/edit-admin/:id", wrapAsync(artistController.adminEditArtist));

router.delete(
  "/delete-admin/:id",
  wrapAsync(artistController.adminDeleteArtist)
);

router.post("/add", wrapAsync(artistController.adminAddArtist));

module.exports = router;
