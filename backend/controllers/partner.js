const Partner = require("../models/Partner");
const apiKey = process.env.ADMIN_API_KEY;
const adminEmail = process.env.DEV_EMAIL;

module.exports.getAllPartners = async (req, res) => {
  const partners = await Partner.find({ activated: true })
    .populate("affiliatedArtists")
    .collation({ locale: "en", strength: 2 })
    .sort({
      fullName: 1,
    });
  res.status(200).json({ partners });
};

module.exports.getAdminPartners = async (req, res) => {
  const key = req.query.key;
  if (key === apiKey) {
    const partners = await Partner.find({ email: adminEmail })
      .collation({ locale: "en", strength: 2 })
      .sort({ fullName: 1 });
    res.status(200).json({ partners });
  } else {
    res.status(401);
  }
};

module.exports.editPartner = async (req, res, next) => {
  console.log("edit");
};

module.exports.adminEditPartner = async (req, res, next) => {
  const key = req.query.key;
  const { id } = req.params;
  let attempt = false;
  if (key === apiKey) {
    const partner = req.body;
    await Partner.findByIdAndUpdate(id, partner);
    attampt = true;
  }
  if (attempt) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.adminDeletePartner = async (req, res, next) => {
  const key = req.query.key;
  const { id } = req.params;
  let attempt = false;
  if (key === apiKey) {
    const deletedPartner = await Partner.findByIdAndUpdate(id);
    if (deletedPartner) attampt = true;
  }
  if (attempt) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.adminAddPartner = async (req, res, next) => {
  const key = req.query.key;
  let attempt = null;
  if (key === apiKey) {
    const partner = req.body;
    const newPartner = new Partner(partner);
    attempt = await newPartner.save();
  }
  if (attempt) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};
