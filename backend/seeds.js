const Artwork = require("./models/Artwork");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Gallery = require("./models/Gallery");
const Partner = require("./models/Partner");

const removeArtworks = async () => {
  await Artwork.deleteMany({});
};

const removeUsers = async () => {
  await User.deleteMany({});
};

const removeArtists = async () => {
  await Artist.deleteMany({});
};

const removeGallery = async () => {
  await Gallery.deleteMany({});
};

const removePartner = async () => {
  await Partner.deleteMany({});
};
