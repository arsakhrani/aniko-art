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

const fixUser = async () => {
  const user = await User.findOneAndUpdate(
    { isVerified: false },
    { isVerified: true }
  );
  console.log(user);
};

fixUser();
