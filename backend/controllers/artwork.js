const Artwork = require("../models/Artwork");
const User = require("../models/User");
const Artist = require("../models/Artist");
const Gallery = require("../models/Gallery");

module.exports.uploadArt = async (req, res) => {
  try {
    const artwork = req.body;
    const newArtwork = new Artwork(artwork);
    newArtwork.size =
      artwork.dimensionsCm.length *
      artwork.dimensionsCm.width *
      artwork.dimensionsCm.depth;
    await newArtwork.save(async () => {
      const user = await User.findById(artwork.owner);
      if (user.sellerType === "artist") {
        const artist = await Artist.findOne({ email: user.email });
        artist.artworks.push(newArtwork._id);
        await artist.save();
      }

      if (user.sellerType === "gallery") {
        const gallery = await Gallery.findOne({ email: user.email });
        gallery.artworks.push(newArtwork._id);
        await gallery.save();
      }

      res.status(201).json({ success: true, uploadedArtwork: newArtwork });
    });
  } catch (e) {
    res.status(400).json({
      message: { msgBody: "An error has occured", msgError: true },
    });
  }
};

module.exports.getAllArt = async (req, res) => {
  try {
    const artworks = await Artwork.find({ sold: false });
    res.status(200).json({ artworks });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

// module.exports.editArt = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = req.body;
//     await User.findByIdAndUpdate(id, user);
//     const updatedUser = await User.findById(id);
//     res.status(201).json({ user: updatedUser, isAuthenticated: true });
//   } catch (e) {
//     res.status(400).send({ message: "Something went wrong!" });
//   }
// };

// module.exports.deleteArt = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const request = req.body;
//     const user = await User.findById(id, user);
//     user.requestedArtWork.push(request);
//     await user.save(); //should send email with nodemailer here
//     res.status(201).json({ success: true });
//   } catch (e) {
//     res.status(400).send({ message: "Something went wrong!" });
//   }
// };
