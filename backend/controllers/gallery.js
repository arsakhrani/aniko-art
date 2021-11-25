const Gallery = require("../models/Gallery");

module.exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find({ activated: true });
    res.status(200).json({ galleries });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

module.exports.editGallery = async (req, res, next) => {
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
