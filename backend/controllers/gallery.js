const Gallery = require("../models/Gallery");

module.exports.getAllGalleries = async (req, res) => {
  const galleries = await Gallery.find({ activated: true })
    .collation({ locale: "en", strength: 2 })
    .sort({
      fullName: 1,
    });
  res.status(200).json({ galleries });
};

module.exports.editGallery = async (req, res, next) => {
  console.log("edit");
};
