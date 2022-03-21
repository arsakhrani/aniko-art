const Exhibition = require("../models/Exhibition");
const Artist = require("../models/Artist");

module.exports.addExhibition = async (req, res) => {
  const { exhibition, userEmail } = req.body;
  const newExhibition = new Exhibition(exhibition);
  await newExhibition.save();

  const artist = await Artist.findOne({ email: userEmail });
  artist.exhibitions.push(newExhibition._id);
  await artist.save();

  res.status(200).json({ success: true, uploadedArtwork: newArtwork });
};

module.exports.deleteExhibition = async (req, res, next) => {
  const { id } = req.params;
  const exhibition = await Exhibition.findByIdAndDelete(id);
  //send emails to affected parties.
  //remove from exhibitino list of artist
  res.status(200).json({ success: true });
};
