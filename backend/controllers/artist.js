const Artist = require("../models/Artist");

module.exports.getAllArtists = async (req, res) => {
  const artists = await Artist.find({ activated: true })
    .populate("artworks")
    .sort({ created: -1 });
  res.status(200).json({ artists });
};

module.exports.editArtist = async (req, res, next) => {
  const { id } = req.params;
  const artist = req.body;
  await Artist.findByIdAndUpdate(id, artist);
  const updatedArtist = await Artist.findById(id);
  if (updatedArtist) {
    res.status(200).json({ artist: updatedArtist, success: true });
  } else {
    res.status(401).json({ success: true });
  }
};
