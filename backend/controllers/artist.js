const Artist = require("../models/Artist");

module.exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ activated: true });
    res.status(200).json({ artists });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

module.exports.editArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = req.body;
    await Artist.findByIdAndUpdate(id, artist);
    const updatedArtist = await Artist.findById(id);
    res.status(201).json({ artist: updatedArtist, success: true });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};
