const Artist = require("../models/Artist");
const apiKey = process.env.ADMIN_API_KEY;
const adminEmail = process.env.DEV_EMAIL;

module.exports.getAllArtists = async (req, res) => {
  const artists = await Artist.find({ activated: true })
    .populate("artworks")
    .collation({ locale: "en", strength: 2 })
    .sort({ fullName: 1 });
  res.status(200).json({ artists });
};

module.exports.getAdminArtists = async (req, res) => {
  const key = req.query.key;
  if (key === apiKey) {
    const artists = await Artist.find({ email: adminEmail })
      .populate("artworks")
      .collation({ locale: "en", strength: 2 })
      .sort({ fullName: 1 });
    res.status(200).json({ artists });
  } else {
    res.status(401);
  }
};

module.exports.editArtist = async (req, res, next) => {
  const { id } = req.params;
  const artist = req.body;
  await Artist.findByIdAndUpdate(id, artist);
  const updatedArtist = await Artist.findById(id);
  if (updatedArtist) {
    res.status(200).json({ artist: updatedArtist, success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.adminEditArtist = async (req, res, next) => {
  const key = req.query.key;
  const { id } = req.params;
  let attempt = false;
  if (key === apiKey) {
    const artist = req.body;
    await Artist.findByIdAndUpdate(id, artist);
    attempt = true;
  }
  if (attempt) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.adminDeleteArtist = async (req, res, next) => {
  const key = req.query.key;
  const { id } = req.params;
  let attempt = false;
  if (key === apiKey) {
    const deletedArtist = await Artist.findByIdAndUpdate(id);
    if (deletedArtist) attempt = true;
  }
  if (attempt) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

module.exports.adminAddArtist = async (req, res, next) => {
  const key = req.query.key;
  let attempt = null;
  if (key === apiKey) {
    const artist = req.body;
    const newArtist = new Artist(artist);
    attempt = await newArtist.save();
  }
  if (attempt) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};
