const Partner = require("../models/Partner");

module.exports.getAllPartners = async (req, res) => {
  const partners = await Partner.find({ activated: true })
    .populate("affiliatedArtists")
    .collation({ locale: "en", strength: 2 })
    .sort({
      fullName: 1,
    });
  res.status(200).json({ partners });
};

module.exports.editPartner = async (req, res, next) => {
  console.log("edit");
};
