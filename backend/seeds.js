const Artwork = require("./models/Artwork");
require("dotenv").config();
const User = require("./models/User");
const Artist = require("./models/Artist");
const Gallery = require("./models/Gallery");
const Partner = require("./models/Partner");
const mongoDomain = process.env.ROOT_MONGO_DOMAIN;
const mongoose = require("mongoose");

mongoose
  .connect(`${mongoDomain}/aniko-art`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connection open");
  })
  .catch((err) => {
    console.log(err);
  });

const deleteUsers = async () => {
  await User.deleteMany({});
  console.log("Users Deleted");
};

const deletArtists = async () => {
  await Artist.deleteMany({});
  console.log("Artsits Deleted");
};

const deletGalleries = async () => {
  await Gallery.deleteMany({});
  console.log("Galleries Deleted");
};

const deleteArtworks = async () => {
  await Artwork.deleteMany({});
  console.log("Artworks Deleted");
};

const deletePartners = async () => {
  await Partner.deleteMany({});
  console.log("Partners Deleted");
};

deleteUsers();
deletArtists();
deletGalleries();
deleteArtworks();
deletePartners();
