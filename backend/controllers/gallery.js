const Gallery = require("../models/Gallery");
const apiKey = process.env.ADMIN_API_KEY;
const adminEmail = process.env.DEV_EMAIL;

module.exports.getAllGalleries = async (req, res) => {
  const galleries = await Gallery.find({ activated: true })
    .collation({ locale: "en", strength: 2 })
    .sort({
      fullName: 1,
    });
  res.status(200).json({ galleries });
};

module.exports.getAdminGalleries = async (req, res) => {
  const key = req.query.key;
  if (key === apiKey) {
    const galleries = await Gallery.find({ email: adminEmail })
      .collation({ locale: "en", strength: 2 })
      .sort({ fullName: 1 });
    res.status(200).json({ galleries });
  } else {
    res.status(401);
  }
};

module.exports.editGallery = async (req, res, next) => {
  console.log("edit");
};

module.exports.adminEditGallery = async (req, res, next) => {
  const key = req.query.key;
  const { id } = req.params;
  let attempt = false;
  if (key === apiKey) {
    const gallery = req.body;
    await Gallery.findByIdAndUpdate(id, gallery);
    attempt = true;
  }
  if (attempt) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.adminDeleteGallery = async (req, res, next) => {
  const key = req.query.key;
  const { id } = req.params;
  let attempt = false;
  if (key === apiKey) {
    const deletedGallery = await Gallery.findByIdAndDelete(id);
    if (deletedGallery) attempt = true;
  }
  if (attempt) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.adminAddGallery = async (req, res, next) => {
  const key = req.query.key;
  let attempt = null;
  if (key === apiKey) {
    const gallery = req.body;
    const newGallery = new Gallery(gallery);
    attempt = await newGallery.save();
  }
  if (attempt) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};
