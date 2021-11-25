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
    // const { id } = req.params;
    // const user = req.body;
    // await User.findByIdAndUpdate(id, user);
    // const updatedUser = await User.findById(id);
    // res.status(201).json({ user: updatedUser, isAuthenticated: true });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};
